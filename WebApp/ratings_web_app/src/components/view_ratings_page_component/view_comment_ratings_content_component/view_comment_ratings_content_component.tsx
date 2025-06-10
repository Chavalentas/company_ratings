import { useEffect, useState } from "react";
import "./view_comment_ratings_content_component.css";
import { useNavigate } from "react-router-dom";
import backendConfig from "../../../config/backend.config.json";
import refresh from "../../../assets/refresh.png";
import ratingsConfig from "../../../config/rating_settings.config.json";
import { Button, Card, Modal } from "react-bootstrap";
import { UsersService } from "../../../services/users.service";
import { RatingsService } from "../../../services/ratings.service";
import { Rating } from "../../../models/business_logic/rating.model";
import { ViewCommentRatingsContentProps } from "../../../props/view_comment_ratings_content.props";
import { CommentRating } from "../../../models/business_logic/comment_rating.model";
import { CommentCriterion } from "../../../models/business_logic/comment_criterion.model";
import { CommentRatingExtended } from "../../../models/business_logic/comment_rating_extended.model";
import { CommentRatingExtendedRB } from "../../../models/response_bodies/ratings_reponse_bodies/comment_rating_extended_rb.model";

const ViewCommentRatingsContent = (props: ViewCommentRatingsContentProps) => {
    const navigate = useNavigate();
    const [ratingToDelete, setRatingToDelete] = useState<Rating>(new CommentRating(0, 0, 0, new Date(), "Hello"));
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
    const [currentCriterion, setCurrentCriterion] = useState<CommentCriterion>(props.criterion);
    const [userId, setUserId] = useState(0);
    const [client, setCurrentClient] = useState(props.client);
    const [ratings, setRatings] = useState<CommentRatingExtended[]>([]);
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
            setCurrentCriterion(props.criterion);
            setUserId(response.userId);
            setCurrentClient(props.client);
            setRatings([]);
            ratingsService.getAllCommentRatingsByCriterionExtended(props.criterion.id)
            .then((response) => {
                if (response.result.length == 0){
                    return;
                }

                let toSet = getExtendedCommentRatings(response.result);
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

    const handleDeleteRatingClick = (rating: CommentRatingExtended) => {
        setRatingToDelete(getCommentRating(rating));
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
    }

    const handleRefreshClick = async() => {
        setRatings([]);
        ratingsService.getAllCommentRatingsByCriterionExtended(props.criterion.id)
        .then((response) => {
            if (response.result.length == 0){
                return;
            }

            let toSet = getExtendedCommentRatings(response.result);
            let newRatings: CommentRatingExtended[] = [];
            newRatings = newRatings.concat(toSet);
            setRatings(newRatings);
        })
        .catch((error) => {
            setRatings([]);
            setModalMessage("The entries could not be fetched! Try again later!");
            setShowModal(true);
        })
    }

    const getExtendedCommentRatings = (rbRatings: CommentRatingExtendedRB[]) : CommentRatingExtended[] => {
        let result = rbRatings.map((r) => (new CommentRatingExtended(r.id, r.userId, r.userName, r.ratingCriterionId, new Date(r.dateOfRating), r.comment)));
        return result;
    }

    const getCommentRating = (extendedRating: CommentRatingExtended) : CommentRating => {
        return new CommentRating(extendedRating.id, extendedRating.userId, extendedRating.ratingCriterionId, extendedRating.dateofRating, extendedRating.comment);
    }


    return(
        <div id="vcrc-main-container">
            <div id="vcrc-main-container-header">
                 <h2>{currentCriterion.criterionName}</h2> 
            </div>
            <div id="vcrc-main-container-body">
                <div className="vcrc-main-container-body-member">
                </div>
                <div className="vcrc-main-container-card-body-member">
                  <div id="vcrc-ratings-list">
                    {ratings.length > 0 ?
                        <div>
                            {ratings.map((r) => (
                                <div className="vcrc-comment-container" key={r.id}>
                                    <Card className="vcrc-comment-card"> 
                                        <Card.Body>
                                            <Card.Title>User: {r.userName}</Card.Title>
                                            <Card.Subtitle>{r.dateofRating.toLocaleString()}</Card.Subtitle>
                                            <Card.Text>
                                                {r.comment}
                                            </Card.Text>
                                            {userId == r.userId ?
                                            <div className="vcrc-comment-card-button-panel">
                                                   <Button className="vcrc-comment-card-button-panel-button" variant="danger" onClick={() => {handleDeleteRatingClick(r)}}>Delete</Button>
                                            </div>
                                            : null}
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                            }                  
                        </div>
                    :
                       <h3>No ratings available!</h3>
                    }
                    </div>
                </div>
                <div id="vcrc-main-container-button-panel">
                   <Button className="vcrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onBackButton()}}>Back</Button>
                   {userId != client.userId ?
                   <Button className="vcrc-main-container-button-panel-button" variant="dark" onClick={() => {props.onRateCriterion(currentCriterion)}}>Rate</Button>
                   : null}
                    <Button className="vcrc-main-container-button-panel-button" variant="dark" onClick={() => handleRefreshClick()}>
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
                <Modal id="vcrc-delete-criterion-modal" show={showDeleteRatingModal} onHide={() => setShowDeleteRatingModal(false)}>
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

export default ViewCommentRatingsContent;