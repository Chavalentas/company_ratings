import { useNavigate } from "react-router-dom";
import { ViewDocumentRatingsContentProps } from "../../../props/view_document_ratings_content.props";
import "./view_document_ratings_content_component.css";
import { useEffect, useState } from "react";
import pdfIcon from "../../../assets/pdf.png";
import backendConfig from "../../../config/backend.config.json";
import ratingsConfig from "../../../config/rating_settings.config.json";
import refresh from "../../../assets/refresh.png";
import { Rating } from "../../../models/business_logic/rating.model";
import { DocumentRating } from "../../../models/business_logic/document_rating.model";
import { DocumentCriterion } from "../../../models/business_logic/document_criterion.model";
import { DocumentRatingExtended } from "../../../models/business_logic/document_rating_extended.model";
import { UsersService } from "../../../services/users.service";
import { RatingsService } from "../../../services/ratings.service";
import { Button, Modal, Table } from "react-bootstrap";
import { DocumentRatingExtendedRB } from "../../../models/response_bodies/ratings_reponse_bodies/document_rating_extended_rb.model";
import {Buffer} from 'buffer';
import { Helper } from "../../../models/business_logic/helper.model";

const ViewDocumentRatingsContent = (props: ViewDocumentRatingsContentProps) => {
    const navigate = useNavigate();
    const [ratingToDelete, setRatingToDelete] = useState<Rating>(new DocumentRating(0, 0, 0, new Date(), "Dummy", Buffer.alloc(0)));
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
    const [currentCriterion, setCurrentCriterion] = useState<DocumentCriterion>(props.criterion);
    const [userId, setUserId] = useState(0);
    const [client, setCurrentClient] = useState(props.client);
    const [ratings, setRatings] = useState<DocumentRatingExtended[]>([]);
    const usersService = new UsersService(backendConfig.host + "/users");
    const ratingsService = new RatingsService(backendConfig.host + "/ratings");
    
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setRatings([]);
            setCurrentCriterion(props.criterion);
            setUserId(response.userId);
            ratingsService.getAllDocumentRatingsByCriterionExtended(props.criterion.id)
            .then((response) => {
                if (response.result.length == 0){
                    return;
                }

                let toSet = getExtendedDocumentRatings(response.result);
                let newRatings = [...ratings];
                newRatings = newRatings.concat(toSet);
                setRatings(newRatings);
            })
            .catch((error) => {
                navigate("/login");
            })
        }).catch((error) => {
            navigate("/login");
            return;
        })
    }, [props]);

    const handleDeleteRatingClick = (rating: DocumentRatingExtended) => {
        setRatingToDelete(getDocumentRating(rating));
        setShowDeleteRatingModal(true);
    }

    const handleConfirmDeleteRatingClick = async() => {
        setShowDeleteRatingModal(false);
        ratingsService.deleteRating(ratingToDelete.id)
        .then((response) => {
            let ratingsNew = [...ratings];
            ratingsNew = ratingsNew.filter(r => r.id != ratingToDelete.id);
            setRatings(ratingsNew);
            setCurrentClient(props.client);
            setModalMessage("The rating was successfully deleted!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be deleted! Try again later!");
            setShowModal(true);
        })
    }

    const handleRefreshClick = async() => {
        setRatings([]);
        ratingsService.getAllDocumentRatingsByCriterionExtended(props.criterion.id)
        .then((response) => {
            if (response.result.length == 0){
                return;
            }

            let toSet = getExtendedDocumentRatings(response.result);
            let newRatings: DocumentRatingExtended[] = [];
            newRatings = newRatings.concat(toSet);
            setRatings(newRatings);
        })
        .catch((error) => {
            setRatings([]);
            setModalMessage("The entries could not be fetched! Try again later!");
            setShowModal(true);
        })
    }


    const handleDownloadFileClick = (rating: DocumentRatingExtended) => {
        let blob = new Blob([rating.documentData], { type: "application/pdf"});
        let link = document.createElement("a");
        let url = URL.createObjectURL(blob);
        link.href = url;
        link.download = rating.documentName;
        document.body.appendChild(link);
        link.click();
    }

    const getExtendedDocumentRatings = (rbRatings: DocumentRatingExtendedRB[]) : DocumentRatingExtended[] => {
        let result = rbRatings.map((r) => (new DocumentRatingExtended(r.id, r.userId, r.userName, r.ratingCriterionId, new Date(r.dateOfRating), r.documentName, Buffer.from(r.documentData, "base64"))));
        return result;
    }

    const getDocumentRating = (extendedRating: DocumentRatingExtended) : DocumentRating => {
        return new DocumentRating(extendedRating.id, extendedRating.userId, extendedRating.ratingCriterionId, extendedRating.dateofRating, extendedRating.documentName, extendedRating.documentData);
    }


    return(
        <div id="vdrc-main-container">
            <div id="vdrc-main-container-header">
                 <h2>{currentCriterion.criterionName}</h2> 
            </div>
            <div id="vdrc-main-container-body">
                <div className="vdrc-main-container-body-member">
                </div>
                <div className="vdrc-main-container-card-body-member">
                  <div id="vdrc-ratings-list">
                    {ratings.length > 0 ?
                        <Table>
                            <thead id="vdrc-ratings-list-header">
                                <tr>
                                    <th>User</th>
                                    <th>File name</th>
                                    <th>Rating</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map(r => (
                                        <tr key={r.id}>
                                            <td>{r.userName}</td>
                                            <td>{r.documentName}</td>
                                            <td>                                            
                                                <Button variant="dark" onClick={() => handleDownloadFileClick(r)}>
                                                    <img src={pdfIcon} width={20} height={20}/>
                                               </Button></td>
                                            <td>{r.dateofRating.toLocaleString()}</td>
                                            {userId == r.userId ?
                                            <td>
                                                <Button className="vdrc-delete-button" variant="danger" onClick={() => handleDeleteRatingClick(r)}>Delete</Button>
                                            </td>
                                            : null
                                            }
                                        </tr>
                                ))}
                            </tbody>
                        </Table>
                    :
                       <h3>No ratings available!</h3>
                    }
                    </div>
                </div>
                <div id="vdrc-main-container-button-panel">
                   <Button className="vdrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onBackButton()}}>Back</Button>
                   {userId != client.userId ?
                   <Button className="vdrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onRateCriterion(currentCriterion)}}>Rate</Button>
                   : null}
                    <Button className="vdrc-main-container-button-panel-button" variant="dark" onClick={() => handleRefreshClick()}>
                        <img src={refresh} width={20} height={20}/>     
                    </Button>
                </div>
                <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                             <Modal.Title>Info</Modal.Title>
                        </Modal.Header>
                             <Modal.Body>{modalMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                </Modal>
                <Modal id="vdrc-delete-criterion-modal" show={showDeleteRatingModal} onHide={() => setShowDeleteRatingModal(false)}>
                    <Modal.Header closeButton>
                            <Modal.Title>Info</Modal.Title>
                    </Modal.Header>
                            <Modal.Body>Are you sure you want to delete the rating? (This cannot be undone!)</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowDeleteRatingModal(false)}>
                            No
                        </Button>
                        <Button variant="secondary" onClick={() => handleConfirmDeleteRatingClick()}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div> 
        </div>
    )
};

export default ViewDocumentRatingsContent;