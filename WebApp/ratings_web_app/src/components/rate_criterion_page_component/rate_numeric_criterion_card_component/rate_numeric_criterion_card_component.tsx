import { Button, Card, Figure, Form } from "react-bootstrap";
import { NumericRatingProps } from "../../../props/numeric_rating.props";
import "./rate_numeric_criterion_card_component.css";
import { useEffect, useState } from "react";
import smilingFace from "../../../assets/smiling_face.png";
import frowningFace from "../../../assets/frowning_face.png";
import borderDashed from "../../../assets/border_dashed.png";
import borderSolid from "../../../assets/border_solid.png";
import { NumericCriterion } from "../../../models/business_logic/numeric_criterion.model";
import { NumericRating } from "../../../models/business_logic/numeric_rating.model";

const RateNumericCriterionCard = (props: NumericRatingProps) => {
    const [currentCriterion, setNumericCriterion] = useState<NumericCriterion>(props.criterion);
    const [currentValue, setCurrentValue] = useState(props.criterion.minValue);

    useEffect(() => {
        setNumericCriterion(props.criterion);
    },[props])

    const handleSubmitButtonClick = () => {
        let newRating = new NumericRating(0, 0, currentCriterion.id, new Date(), currentValue);
        props.onSubmitClick(newRating);
    }

    const handleValueChange = (changedValue: number) => {
        setCurrentValue(changedValue);
    }
    
    return(
        <Card id="rncc-rate-criterion-card">
        <Card.Body>
            <div id="rncc-rate-criterion-card-header">
                <Card.Title><h2>{currentCriterion.criterionName}</h2></Card.Title>
            </div>
            <div id="rncc-rate-criterion-card-body">
                <div className="rncc-rate-criterion-card-body-member">
                    <div id="rncc-number-range-criterion-container">
                        <div className="rncc-number-range-criterion-container-member">
                            <div className="rncc-smiley-number-container">
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
                        <div className="rncc-number-range-criterion-container-member">
                            <Figure>
                                <Figure.Image
                                    width={250}
                                    height={20}
                                    src={borderDashed}
                                    alt="border_dashed"
                                />
                            </Figure>
                        </div>
                        <div className="rncc-number-range-criterion-container-member">
                            <div className="rncc-smiley-number-container">
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
                <div className="rncc-rate-criterion-card-body-member">
                    <div id="rncc-numeric-criterion-rating-container">
                        <div id="rncc-numeric-criterion-rating-container-header">
                            <h5>Your Rating: {currentValue}</h5>
                        </div>
                        <Form.Range value={currentValue} onChange={(e) => handleValueChange(Number(e.target.value))} id="rncc-numeric-slider" min={currentCriterion.minValue} max={currentCriterion.maxValue}/>
                        <div className="rncc-numeric-axis-indicator-div">
                            <div className="rncc-numeric-axis-indicator-left">
                                <h5>{currentCriterion.minValue}</h5>
                            </div>
                            <div className="rncc-numeric-axis-indicator-right">
                                <h5>{currentCriterion.maxValue}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card.Body>
        <div id="rncc-rate-criterion-card-button-panel">
            <Button className="rncc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {props.onBackButtonClick()}}>Back</Button>
            <Button className="rncc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {handleSubmitButtonClick()}}>Submit</Button>
        </div>
    </Card>
    );
}

export default RateNumericCriterionCard;