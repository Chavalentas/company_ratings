import { useEffect, useState } from "react";
import { CommentRatingProps } from "../../../props/comment_rating.props";
import "./rate_comment_criterion_card_component.css";
import { CommentCriterion } from "../../../models/business_logic/comment_criterion.model";
import { CommentRating } from "../../../models/business_logic/comment_rating.model";
import { Button, Card, Form } from "react-bootstrap";

const RateCommentCriterionCard = (props: CommentRatingProps) => {        
    const [currentCriterion, setCommentCriterion] = useState<CommentCriterion>(props.criterion);
    const [currentValue, setCurrentValue] = useState("");
    const [ratingError, setRatingError] = useState("");

    useEffect(() => {
        setCommentCriterion(props.criterion);
    },[props])

    const handleSubmitButtonClick = () => {
        setRatingError("");

        if (currentValue.length == 0){
            setRatingError("Please fill in the form");
            return;
        }

        let newRating = new CommentRating(0, 0, currentCriterion.id, new Date(), currentValue);
        props.onSubmitClick(newRating);
    }
    
    const handleTextAreaChange = (value: string) => {
        setRatingError("");

        if (value.length == 0){
            setRatingError("Please fill in the form");
        }

        setCurrentValue(value);
    }

    return(
    <Card id="rccc-rate-criterion-card">
        <Card.Body>
            <div id="rccc-rate-criterion-card-header">
                <Card.Title><h2>{currentCriterion.criterionName}</h2></Card.Title>
            </div>
            <div id="rccc-rate-criterion-card-body">
                <div className="rccc-rate-criterion-card-body-member">
                </div>
                <div className="rccc-rate-criterion-card-body-member">
                    <div id="rccc-comment-criterion-rating-container">
                            <div id="rccc-comment-criterion-rating-container-header">
                                <h5>Your Rating</h5>
                            </div>
                            <Form.Group onSubmit={() => handleSubmitButtonClick()} className="mb-3">
                                <Form.Control value={currentValue}  onChange={(e) => handleTextAreaChange(e.target.value)} isInvalid={!!ratingError} id="rccc-comment-text-area" as="textarea" rows={3} required/>
                                <Form.Control.Feedback type="invalid">{ratingError}</Form.Control.Feedback>
                            </Form.Group>
                    </div>
                </div>
            </div>
        </Card.Body>
        <div id="rccc-rate-criterion-card-button-panel">
            <Button className="rccc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {props.onBackButtonClick()}}>Back</Button>
            <Button type="submit" className="rccc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {handleSubmitButtonClick()}}>Submit</Button>
        </div>
    </Card>
    )
}

export default RateCommentCriterionCard;