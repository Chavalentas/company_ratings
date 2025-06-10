import { useEffect, useState } from "react";
import { TextValueRatingProps } from "../../../props/text_value_rating.props";
import "./rate_text_criterion_card_componet.css";
import { TextValueCriterion } from "../../../models/business_logic/text_value_criterion.model";
import { Button, Card, Figure, Form } from "react-bootstrap";
import { TextCriterionIntValue } from "../../../models/business_logic/text_criterion_int_value.model";
import smilingFace from "../../../assets/smiling_face.png";
import frowningFace from "../../../assets/frowning_face.png";
import { TextValueRating } from "../../../models/business_logic/text_value_rating.model";

const RateTextCriterionCard = (props: TextValueRatingProps) => {
    const [currentCriterion, setTextValueCriterion] = useState<TextValueCriterion>(props.criterion);
    const [intToValueMappings, setIntToValueMappings] = useState<TextCriterionIntValue[]>(currentCriterion.intToValueMappings);
    const [currentValue, setCurrentValue] = useState<TextCriterionIntValue>({int: intToValueMappings[0].int, value: intToValueMappings[0].value} as TextCriterionIntValue);

    useEffect(() => {
        setTextValueCriterion(props.criterion);
        let mappingsSorted = props.criterion.intToValueMappings.sort((a, b) => a.int < b.int ? -1 : a.int > b.int ? 1 : 0);
        setIntToValueMappings(mappingsSorted);
    }, [props]);


    const handleSubmitButtonClick = () => {
        let rating = new TextValueRating(0, 0, currentCriterion.id, new Date(), currentValue.int);
        props.onSubmitClick(rating);
    }

    const handleDropdownValueChange = (value: string) => {
        let newValue = intToValueMappings.filter(v => v.value == value)[0];
        setCurrentValue(newValue);
    }

    return (
        <Card id="rtcc-rate-criterion-card">
        <Card.Body>
            <div id="rtcc-rate-criterion-card-header">
                <Card.Title><h2>{currentCriterion.criterionName}</h2></Card.Title>
            </div>
            <div id="rtcc-rate-criterion-card-body">
                <div className="rtcc-rate-criterion-card-body-member">
                {intToValueMappings.length >= 2 ? 
                    <div id="rtcc-text-value-criterion-container">
                        <div className="rtcc-text-value-criterion-container-member">
                            <h3>{intToValueMappings[0].value}</h3>
                            <div className="rtcc-member-div">
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
                        {intToValueMappings.length > 2 ? 
                            intToValueMappings.slice(1, intToValueMappings.length - 1).map(c  => (
                                <div className="rtcc-text-value-criterion-container-member" key={c.int}>
                                    <h3>{c.value}</h3>
                                    <div className="rtcc-member-div">

                                    </div>
                                </div>
                            ))
                        : null
                        }
                        <div className="rtcc-text-value-criterion-container-member">
                            <h3>{intToValueMappings[intToValueMappings.length - 1].value}</h3>
                            <div className="rtcc-member-div">
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
                <div className="rtcc-rate-criterion-card-body-member">
                    <div id="rtcc-rate-criterion-dropdown-container">
                        <div className="rtcc-rate-criterion-dropdown-container-member">
                            <h5>Your Rating</h5>
                        </div>
                        <div className="rtcc-rate-criterion-dropdown-container-member">
                           <Form.Select id="rtcc-option-select-dropdown" onChange={(e) => handleDropdownValueChange(e.target.value)} value={currentValue.value} size="sm">
                                    {intToValueMappings.map((value) => (
                                          <option value={value.value}>{value.value}</option>                         
                                    ))}
                            </Form.Select>
                        </div>
                    </div>    
                </div>
            </div>
        </Card.Body>
        <div id="rtcc-rate-criterion-card-button-panel">
            <Button className="rtcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {props.onBackButtonClick()}}>Back</Button>
            <Button className="rtcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {handleSubmitButtonClick()}}>Submit</Button>
        </div>
    </Card>
    );
};

export default RateTextCriterionCard;