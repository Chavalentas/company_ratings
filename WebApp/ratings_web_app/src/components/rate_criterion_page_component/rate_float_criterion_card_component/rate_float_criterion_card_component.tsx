import { Button, Card, Figure, Form } from "react-bootstrap";
import { FloatRatingProps } from "../../../props/float_rating.props";
import "./rate_float_criterion_card_component.css";
import { FloatCriterion } from "../../../models/business_logic/float_criterion.model";
import backendConfig from "../../../config/backend.config.json";
import smilingFace from "../../../assets/smiling_face.png";
import frowningFace from "../../../assets/frowning_face.png";
import borderDashed from "../../../assets/border_dashed.png";
import borderSolid from "../../../assets/border_solid.png";
import criteriaConfig from "../../../config/criteria_settings.config.json";
import { useEffect, useState } from "react";
import { FloatRating } from "../../../models/business_logic/float_rating.model";

const RateFloatCriterionCard = (props: FloatRatingProps) => {
    const [floatCriterion, setFloatCriterion] = useState<FloatCriterion>(props.criterion);
    const [currentValue, setCurrentValue] = useState(props.criterion.minValue);

    useEffect(() => {
        setFloatCriterion(props.criterion);
    },[props])

    const handleSubmitButtonClick = () => {
        let newRating = new FloatRating(0, 0, floatCriterion.id, new Date(), currentValue);
        props.onSubmitClick(newRating);
    }

    const handleValueChange = (changedValue: number) => {
        setCurrentValue(changedValue);
    }

    return (
        <Card id="rfcc-rate-criterion-card">
            <Card.Body>
                <div id="rfcc-rate-criterion-card-header">
                    <Card.Title><h2>{floatCriterion.criterionName}</h2></Card.Title>
                </div>
                <div id="rfcc-rate-criterion-card-body">
                    <div className="rfcc-rate-criterion-card-body-member">
                        <div id="rfcc-float-range-criterion-container">
                            <div className="rfcc-float-range-criterion-container-member">
                                <div className="rfcc-smiley-float-container">
                                    {floatCriterion.minValue == floatCriterion.worstValue ? 
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
                                    <h2>{floatCriterion.minValue}</h2>
                                </div>
                            </div>
                            <div className="rfcc-float-range-criterion-container-member">
                                <Figure>
                                    <Figure.Image
                                        width={250}
                                        height={20}
                                        src={borderSolid}
                                        alt="border_solid"
                                    />
                                </Figure>
                            </div>
                            <div className="rfcc-float-range-criterion-container-member">
                                <div className="rfcc-smiley-float-container">
                                    {floatCriterion.maxValue == floatCriterion.worstValue ? 
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
                                    <h2>{floatCriterion.maxValue}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rfcc-rate-criterion-card-body-member">
                        <div id="rfcc-float-criterion-rating-container">
                            <div id="rfcc-float-criterion-rating-container-header">
                                    <h5>Your Rating: {currentValue}</h5>
                            </div>
                            <Form.Range step={criteriaConfig.floatStepSize} value={currentValue} onChange={(e) => handleValueChange(Number(e.target.value))} id="rcp-float-slider" min={floatCriterion.minValue} max={floatCriterion.maxValue}/>
                            <div className="rfcc-float-axis-indicator-div">
                                <div className="rfcc-float-axis-indicator-left">
                                    <h5>{floatCriterion.minValue}</h5>
                                </div>
                                <div className="rfcc-float-axis-indicator-right">
                                    <h5>{floatCriterion.maxValue}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <div id="rfcc-rate-criterion-card-button-panel">
                <Button className="rfcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {props.onBackButtonClick()}}>Back</Button>
                <Button className="rfcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {handleSubmitButtonClick()}}>Submit</Button>
            </div>
        </Card>  
    )
}

export default RateFloatCriterionCard;