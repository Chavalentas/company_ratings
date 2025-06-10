import { useEffect, useState } from "react";
import { ViewNumericRatingsContentProps } from "../../../props/view_numeric_ratings_content.props";
import "./view_numeric_ratings_content_component.css";
import { NumericCriterion } from "../../../models/business_logic/numeric_criterion.model";
import smilingFace from "../../../assets/smiling_face.png";
import frowningFace from "../../../assets/frowning_face.png";
import borderDashed from "../../../assets/border_dashed.png";
import { useNavigate } from "react-router-dom";
import backendConfig from "../../../config/backend.config.json";
import ratingsConfig from "../../../config/rating_settings.config.json";
import refresh from "../../../assets/refresh.png";
import { Button, Figure, Modal, Table } from "react-bootstrap";
import { NumericRating } from "../../../models/business_logic/numeric_rating.model";
import { UsersService } from "../../../services/users.service";
import { RatingsService } from "../../../services/ratings.service";
import { NumericRatingExtended } from "../../../models/business_logic/numeric_rating_extended.model";
import { NumberRatingExtendedRB } from "../../../models/response_bodies/ratings_reponse_bodies/number_rating_extended_rb.model";
import { Rating } from "../../../models/business_logic/rating.model";

const ViewNumericRatingsContent = (props: ViewNumericRatingsContentProps) => {
    const navigate = useNavigate();
    const [ratingToDelete, setRatingToDelete] = useState<Rating>(new NumericRating(0, 0, 0, new Date(), 9));
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
    const [currentCriterion, setCurrentCriterion] = useState<NumericCriterion>(props.criterion);
    const [currentAverageRating, setCurrentAverageRating] = useState<number>(0);
    const [userId, setUserId] = useState(0);
    const [client, setCurrentClient] = useState(props.client);
    const [ratings, setRatings] = useState<NumericRatingExtended[]>([]);
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

            ratingsService.getAllNumericRatingsByCriterionExtended(props.criterion.id)
            .then((response) => {
                if (response.result.length == 0){
                    return;
                }

                ratingsService.getAllNumericRatingsAvgByCriterionExtended(props.criterion.id)
                .then((response) => {
                    setCurrentAverageRating(response.result);
                })
                .catch((error) => {
                    setModalMessage("The average rating could not be calculated! Try again later!");
                    setShowModal(true);
                })

                let toSet = getExtendedNumericRatings(response.result);
                let newRatings: NumericRatingExtended[] = [];
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

    const handleDeleteRatingClick = (rating: NumericRatingExtended) => {
        setRatingToDelete(getNumericRating(rating));
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
        }).finally(() => {
            ratingsService.getAllNumericRatingsAvgByCriterionExtended(props.criterion.id).then((response) => {
                setCurrentAverageRating(response.result);
            }).catch((error) => {
                 setModalMessage("The average rating could not be calculated! Try again later!");
                 setShowModal(true);
            })
        })
    }

    const handleRefreshClick = async() => {
        try{
           let avgResponse = await ratingsService.getAllNumericRatingsAvgByCriterionExtended(props.criterion.id);
           setCurrentAverageRating(avgResponse.result);
        }
        catch(e){
            setModalMessage("The average rating could not be calculated! Try again later!");
            setShowModal(true);
        }
    
        setRatings([]);
        ratingsService.getAllNumericRatingsByCriterionExtended(props.criterion.id)
        .then((response) => {
            if (response.result.length == 0){
                return;
            }

            let toSet = getExtendedNumericRatings(response.result);
            let newRatings: NumericRatingExtended[] = [];
            newRatings = newRatings.concat(toSet);
            setRatings(newRatings);
        })
        .catch((error) => {
            setRatings([]);
            setModalMessage("The entries could not be fetched! Try again later!");
            setShowModal(true);
        })
    }

    const getExtendedNumericRatings = (rbRatings: NumberRatingExtendedRB[]) : NumericRatingExtended[] => {
        let result = rbRatings.map((r) => (new NumericRatingExtended(r.id, r.userId, r.userName, r.ratingCriterionId, new Date(r.dateOfRating), r.ratingValue)));
        return result;
    }

    const getNumericRating = (extendedRating: NumericRatingExtended) : NumericRating => {
        return new NumericRating(extendedRating.id, extendedRating.userId, extendedRating.ratingCriterionId, extendedRating.dateofRating, extendedRating.ratingValue);
    }


    return(
        <div id="vnrc-main-container">
            <div id="vnrc-main-container-header">
                 <h2>{currentCriterion.criterionName}</h2> 
            </div>
            <div id="vnrc-main-container-body">
                <div className="vnrc-main-container-body-member">
                    <div id="vnrc-number-range-criterion-container">
                        <div className="vnrc-number-range-criterion-container-member">
                            <div className="vnrc-smiley-number-container">
                                {currentCriterion.minValue == currentCriterion.worstValue ? 
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={100}
                                            src={frowningFace}
                                            alt="frowning_face"
                                        />
                                    </Figure>
                                    :
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={100}
                                            src={smilingFace}
                                            alt="smiling_face"
                                        />
                                    </Figure>
                                }
                                <h2>{currentCriterion.minValue}</h2>
                            </div>
                        </div>
                        <div className="vnrc-number-range-criterion-container-member">
                            <Figure>
                                <Figure.Image
                                    width={250}
                                    height={20}
                                    src={borderDashed}
                                    alt="border_dashed"
                                />
                            </Figure>
                        </div>
                        <div className="vnrc-number-range-criterion-container-member">
                            <div className="vnrc-smiley-number-container">
                                {currentCriterion.maxValue == currentCriterion.worstValue ? 
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={100}
                                            src={frowningFace}
                                            alt="frowning_face"
                                        />
                                    </Figure>
                                    :
                                    <Figure>
                                        <Figure.Image
                                            width={100}
                                            height={100}
                                            src={smilingFace}
                                            alt="smiling_face"
                                        />
                                    </Figure>
                                }
                                <h2>{currentCriterion.maxValue}</h2>
                            </div>
                        </div>
                   </div>
                </div>
                {ratings.length > 0 ?
                <div className="vnrc-main-container-body-member">
                    <h3>Average rating: {Math.round(currentAverageRating * 10)/10}</h3>
                </div>
                : null}
                <div className="vnrc-main-container-card-body-member">
                  <div id="vnrc-ratings-list">
                    {ratings.length > 0 ?
                        <Table>
                            <thead id="vnrc-ratings-list-header">
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
                                            <td>{r.ratingValue}</td>
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
                <div id="vnrc-main-container-button-panel">
                   <Button className="vnrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onBackButton()}}>Back</Button>
                   {userId != client.userId ?
                   <Button className="vnrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onRateCriterion(currentCriterion)}}>Rate</Button>
                   : null}
                    <Button className="vnrc-main-container-button-panel-button" variant="dark" onClick={() => handleRefreshClick()}>
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

export default ViewNumericRatingsContent;