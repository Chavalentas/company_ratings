import { useEffect, useState } from "react";
import "./view_text_ratings_content_component.css";
import smilingFace from "../../../assets/smiling_face.png";
import frowningFace from "../../../assets/frowning_face.png";
import { useNavigate } from "react-router-dom";
import backendConfig from "../../../config/backend.config.json";
import ratingsConfig from "../../../config/rating_settings.config.json";
import refresh from "../../../assets/refresh.png";
import { Button, Figure, Modal, Table } from "react-bootstrap";
import { UsersService } from "../../../services/users.service";
import { RatingsService } from "../../../services/ratings.service";
import { Rating } from "../../../models/business_logic/rating.model";
import { ViewTextRatingsContentProps } from "../../../props/view_text_ratings_content.props";
import { TextValueCriterion } from "../../../models/business_logic/text_value_criterion.model";
import { TextValueRating } from "../../../models/business_logic/text_value_rating.model";
import { TextValueRatingExtended } from "../../../models/business_logic/text_value_rating_extended.model";
import { TextValueRatingExtendedRB } from "../../../models/response_bodies/ratings_reponse_bodies/text_value_rating_extended_rb.model";
import { TextCriterionIntValue } from "../../../models/business_logic/text_criterion_int_value.model";

const ViewTextRatingsContent = (props: ViewTextRatingsContentProps) => {
    const navigate = useNavigate();
    const [ratingToDelete, setRatingToDelete] = useState<Rating>(new TextValueRating(0, 0, 0, new Date(), 9));
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
    const [currentCriterion, setCurrentCriterion] = useState<TextValueCriterion>(props.criterion);
    const [currentCommonRating, setCurrentCommonRating] = useState<TextCriterionIntValue>({int: 0, value: ""} as TextCriterionIntValue);
    const [userId, setUserId] = useState(0);
    const [client, setCurrentClient] = useState(props.client);
    const [ratings, setRatings] = useState<TextValueRatingExtended[]>([]);
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
            let mappingsSorted = props.criterion.intToValueMappings.sort((a, b) => a.int < b.int ? -1 : a.int > b.int ? 1 : 0);
            props.criterion.intToValueMappings = mappingsSorted;
            setCurrentCriterion(props.criterion);
            setUserId(response.userId);
            setCurrentClient(props.client);
            ratingsService.getAllTextRatingsByCriterionExtended(props.criterion.id)
            .then((response) => {
                if (response.result.length == 0){
                    return;
                }

                ratingsService.getMostCommonTextRatingByCriterionExtended(props.criterion.id)
                .then((response) => {
                    setCurrentCommonRating({int: response.valueInt, value: response.valueText} as TextCriterionIntValue);
                })
                .catch((error) => {
                    setModalMessage("The most common rating could not be calculated! Try again later!");
                    setShowModal(true);
                })

                let toSet = getExtendedTextValueRatings(response.result);
                let newRatings: TextValueRatingExtended[] = [];
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

    const handleDeleteRatingClick = (rating: TextValueRatingExtended) => {
        setRatingToDelete(getTextValueRating(rating));
        setShowDeleteRatingModal(true);
    }

    const handleConfirmDeleteRatingClick = async() => { 
        setShowDeleteRatingModal(false);
        ratingsService.deleteRating(ratingToDelete.id)
        .then((response) => {
            let ratingsNew = [...ratings];
            ratingsNew = ratingsNew.filter(r => r.id != ratingToDelete.id);
            setRatings(ratingsNew);
            setModalMessage("The rating was successfully deleted!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be deleted! Try again later!");
            setShowModal(true);
        })
        .finally(() => {
            ratingsService.getMostCommonTextRatingByCriterionExtended(props.criterion.id).then((response) => {
                setCurrentCommonRating({int: response.valueInt, value: response.valueText} as TextCriterionIntValue);
            }).catch((error) => {
                 setModalMessage("The most common rating could not be calculated! Try again later!");
                 setShowModal(true);
            })
        })
        
    }

    const handleRefreshClick = async() => {
        try{
            let mostCommonResponse = await ratingsService.getMostCommonTextRatingByCriterionExtended(props.criterion.id);
            setCurrentCommonRating({int: mostCommonResponse.valueInt, value: mostCommonResponse.valueText} as TextCriterionIntValue);
        }
         catch(e){
             setModalMessage("The average rating could not be calculated! Try again later!");
             setShowModal(true);
        }

        setRatings([]);
        ratingsService.getAllTextRatingsByCriterionExtended(props.criterion.id)
        .then((response) => {
            if (response.result.length == 0){
                return;
            }

            let toSet = getExtendedTextValueRatings(response.result);
            let newRatings: TextValueRatingExtended[] = [];
            newRatings = newRatings.concat(toSet);
            setRatings(newRatings);
        })
        .catch((error) => {
            setRatings([]);
            setModalMessage("The entries could not be fetched! Try again later!");
            setShowModal(true);
        })
    }

    const getIntValueText = (intValue: number) => {
        let criterion = currentCriterion;
        let mapping = criterion.intToValueMappings.filter(m => m.int == intValue)[0];
        return mapping.value;
    }

    const getExtendedTextValueRatings = (rbRatings: TextValueRatingExtendedRB[]) : TextValueRatingExtended[] => {
        let result = rbRatings.map((r) => (new TextValueRatingExtended(r.id, r.userId, r.userName, r.ratingCriterionId, new Date(r.dateOfRating), r.textValueInt)));
        return result;
    }

    const getTextValueRating = (extendedRating: TextValueRatingExtended) : TextValueRating => {
        return new TextValueRating(extendedRating.id, extendedRating.userId, extendedRating.ratingCriterionId, extendedRating.dateofRating, extendedRating.textValueInt);
    }


    return(
        <div id="vtrc-main-container">
            <div id="vtrc-main-container-header">
                 <h2>{currentCriterion.criterionName}</h2> 
            </div>
            <div id="vtrc-main-container-body">
                <div className="vnrc-main-container-body-member">
                    {currentCriterion.intToValueMappings.length >= 2 ? 
                        <div id="vtrc-text-value-criterion-container">
                            <div className="vtrc-text-value-criterion-container-member">
                                <h3>{currentCriterion.intToValueMappings[0].value}</h3>
                                <div className="vtrc-member-div">
                                {currentCriterion.minValue == currentCriterion.worstValue ? 
                                    <Figure>
                                        <Figure.Image
                                            width={50}
                                            height={50}
                                            src={frowningFace}
                                            alt="frowning_face"
                                        />
                                    </Figure>
                                    :
                                    <Figure>
                                        <Figure.Image
                                            width={50}
                                            height={50}
                                            src={smilingFace}
                                            alt="smiling_face"
                                        />
                                    </Figure>
                                }    
                                </div>
                            </div>
                            {currentCriterion.intToValueMappings.length > 2 ? 
                                currentCriterion.intToValueMappings.slice(1, currentCriterion.intToValueMappings.length - 1).map(c  => (
                                    <div className="vtrc-text-value-criterion-container-member" key={c.int}>
                                        <h3>{c.value}</h3>
                                        <div className="vtrc-member-div">

                                        </div>
                                    </div>
                                ))
                            : null
                            }
                            <div className="vtrc-text-value-criterion-container-member">
                                <h3>{currentCriterion.intToValueMappings[currentCriterion.intToValueMappings.length - 1].value}</h3>
                                <div className="vtrc-member-div">
                                {currentCriterion.maxValue == currentCriterion.worstValue ? 
                                    <Figure>
                                        <Figure.Image
                                            width={50}
                                            height={50}
                                            src={frowningFace}
                                            alt="frowning_face"
                                        />
                                    </Figure>
                                    :
                                    <Figure>
                                        <Figure.Image
                                            width={50}
                                            height={50}
                                            src={smilingFace}
                                            alt="smiling_face"
                                        />
                                    </Figure>
                                }
                                </div>
                            </div>
                        </div>
                        : null
                    }     
                </div>
                {ratings.length > 0 ?
                <div className="vtrc-main-container-body-member">
                    <h3>Most common rating: {currentCommonRating.value}</h3>
                </div>
                : null}
                <div className="vtrc-main-container-card-body-member">
                  <div id="vtrc-ratings-list">
                    {ratings.length > 0 ?
                        <Table>
                            <thead id="vtrc-ratings-list-header">
                                <tr>
                                    <th>User</th>
                                    <th>Rating</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ratings.map(r => (
                                        <tr key={r.id}>
                                            <td>{r.userName}</td>
                                            <td>{getIntValueText(r.textValueInt)}</td>
                                            <td>{r.dateofRating.toLocaleString()}</td>
                                            {userId == r.userId ?
                                            <td>
                                                <Button className="vcrc-delete-button" variant="danger" onClick={() => handleDeleteRatingClick(r)}>Delete</Button>
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
                <div id="vtrc-main-container-button-panel">
                   <Button className="vtrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onBackButton()}}>Back</Button>
                   {userId != client.userId ?
                   <Button className="vtrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onRateCriterion(currentCriterion)}}>Rate</Button>
                   : null}
                    <Button className="vtrc-main-container-button-panel-button" variant="dark" onClick={() => handleRefreshClick()}>
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
                <Modal id="vnrc-delete-criterion-modal" show={showDeleteRatingModal} onHide={() => setShowDeleteRatingModal(false)}>
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

export default ViewTextRatingsContent;