import { Button, Card, Figure, Form, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import "./add_text_value_criterion_page_component.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backendConfig from "../../config/backend.config.json";
import criteriaConfig from "../../config/criteria_settings.config.json";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { UsersService } from "../../services/users.service";
import { CriteriaService } from "../../services/criteria.service";
import { Helper } from "../../models/business_logic/helper.model";
import { TextCriterionIntValue } from "../../models/business_logic/text_criterion_int_value.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { Client } from "../../models/business_logic/client.model";

const AddTextValueCriterionPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [minValue, setMinValue] = useState(criteriaConfig.numericSmallestPossible);
    const [minValueError, setMinValueError] = useState("");
    const [maxValue, setMaxValue] = useState(criteriaConfig.numericSmallestPossible);
    const [maxValueError, setMaxValueError] = useState("");
    const [minValueEvaluator, setMinValueEvaluator] = useState("best"); 
    const [maxValueEvaluator, setMaxValueEvaluator] = useState("worst"); 
    const [criterionNameError, setCriterionNameError] = useState("");
    const [criterionName, setCriterionName] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const location = useLocation();
    const usersService = new UsersService(backendConfig.host + "/users");
    const criteriaService = new CriteriaService(backendConfig.host + "/criteria");
    const [textValueStepsErrorMessage, setTextValueStepsErrorMessage] = useState("");
    const [userId, setUserId] = useState(0);
    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState(0);
    const [textValueIntsSteps, setTextValueIntsSteps] = useState([{value: "", int: String(criteriaConfig.numericSmallestPossible), 
        valueErrorMessage: "", intErrorMessage: "", addButtonDisabled: true, removeButtonDisabled: true},
        {value: "", int: String(criteriaConfig.numericLargestPossible), 
            valueErrorMessage: "", intErrorMessage: "", addButtonDisabled: false, removeButtonDisabled: true}])

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
            let client = location.state as Client;
            setClientId(client.id);
            setClientName(client.name);
        }).catch((error) => {
            console.log(error);
            navigate("/login");
            return;
        })
    }, []);

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        if (criterionName.length === 0){
            setCriterionNameError("Please enter a valid criterion name");
            return;
        } 

        setCriterionNameError("");

        if (minValue >= maxValue){
            setMinValueError("Min value must be less than max value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");

        if (maxValue <= minValue){
            setMaxValueError("Max value be greater than min value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");

        let textValueStepsCorrect = true;


        let stepsModified = [...textValueIntsSteps];

        stepsModified.forEach((step, index) => {
            if (step["value"].length === 0){
                stepsModified[index]["valueErrorMessage"] = "Cannot be empty!";
                textValueStepsCorrect = false;
            }

            if (step["int"].length === 0){
                stepsModified[index]["intErrorMessage"] = "Cannot be empty!";
                textValueStepsCorrect = false;
            }

            if (isNaN(Number(step["int"]))){
                stepsModified[index]["intErrorMessage"] = "No valid number!";  
            }
        })

        setTextValueIntsSteps(stepsModified);

        if (!textValueStepsCorrect){
            return;
        }

        let texts = textValueIntsSteps.map(s => s["value"]);
        let ords = textValueIntsSteps.map(s => Number(s["int"]));

        if (!Helper.allUnique(texts)){
            setTextValueStepsErrorMessage("All step names must be unique!");
            return;
        }

        if (!Helper.allUnique(ords)){
            setTextValueStepsErrorMessage("All step ordinal values must be unique!");
            return;
        }

        if (ords.some(e => !(e >= minValue && e <= maxValue))){
            setTextValueStepsErrorMessage("All step ordinal values must be within the min and max range!");
            return;
        }

        if (!ords.some(v => v == minValue)){
            setTextValueStepsErrorMessage("One of the step ordinal values must equal to the min value!");
            return;
        }

        if (!ords.some(v => v == maxValue)){
            setTextValueStepsErrorMessage("One of the step ordinal values must equal to the max value!");
            return;
        }

        setTextValueStepsErrorMessage("");

        let criterionToRegister = getCriterion();
        criteriaService.registerTextValueCriterion(criterionToRegister)
        .then((response) => {
            setModalMessage("The criterion was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            console.log(error)
            setModalMessage("Some error occurred during the criterion registration!");
            setShowModal(true);
        })
    };

    const getCriterion = () : TextValueCriterion => {
        let bestValue: number = 0;
        let worstValue: number = 0;
        let minEvaluator: string = minValueEvaluator;
        let maxEvaluator: string = maxValueEvaluator;

        if (minEvaluator == "best"){
            bestValue = minValue;
        }

        if (minEvaluator == "worst"){
            worstValue = minValue;
        }

        if (maxEvaluator == "best"){
            bestValue = maxValue;
        }

        if (maxEvaluator == "worst"){
            worstValue = maxValue;
        }

        let texts = textValueIntsSteps.map(s => s["value"]);
        let ords = textValueIntsSteps.map(s => Number(s["int"]));
        let intToValueMappings = texts.map((v, index) => ({value: v, int: ords[index]} as TextCriterionIntValue))
        let criterion: TextValueCriterion = new TextValueCriterion(0, clientId, criterionName, minValue, maxValue,
            worstValue, bestValue, intToValueMappings);
        return criterion;
    }

    const handleCriterionNameChange = (criterionName: string) => {
        setTextValueStepsErrorMessage("");
        setCriterionName(criterionName);

        if (criterionName.length === 0){
            setCriterionNameError("Please enter a valid criterion name");
            return;
        } 

        setCriterionNameError("");
    }

    const handleMinValueChange = (changedMinValue: number) => {
        setTextValueStepsErrorMessage("");
        setMinValue(changedMinValue);
        let stepsModified = [...textValueIntsSteps];
        stepsModified[0]["int"] = String(changedMinValue);
        setTextValueIntsSteps(stepsModified);

        if (changedMinValue >= maxValue){
            setMinValueError("Min value must be less than max value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");
    }

    const handleMinValueEvaluatorChange = (changedEvaluator: string) => {
        setTextValueStepsErrorMessage("");
        let current = minValueEvaluator;
        setMinValueEvaluator(changedEvaluator);
        setMaxValueEvaluator(current);
    }

    const handleMaxValueEvaluatorChange = (changedEvaluator: string) => {
        let current = maxValueEvaluator;
        setMinValueEvaluator(current);
        setMaxValueEvaluator(changedEvaluator);
    }

    const handleMaxValueChange = (changedMaxValue: number) => {
        setTextValueStepsErrorMessage("");
        setMaxValue(changedMaxValue);
        let stepsModified = [...textValueIntsSteps];
        stepsModified[1]["int"] = String(changedMaxValue);
        setTextValueIntsSteps(stepsModified);

        if (changedMaxValue <= minValue){
            setMaxValueError("Max value be greater than min value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");
    }

    const handleChangedTextValue = (value: string, index: number) => {  
        setTextValueStepsErrorMessage("");   
        let stepsModified = [...textValueIntsSteps];
        stepsModified[index]["value"] = value;

        if (value.length === 0){
            stepsModified[index]["valueErrorMessage"] = "Cannot be empty!";
            setTextValueIntsSteps(stepsModified);
            return;
        }

        stepsModified[index]["valueErrorMessage"] = "";
        setTextValueIntsSteps(stepsModified);
    }

    const handleChangedOrdinalValue = (value: string, index: number) => {
        setTextValueStepsErrorMessage("");
        let stepsModified = [...textValueIntsSteps];
        stepsModified[index]["int"] = value;

        if (value.length === 0){
            stepsModified[index]["intErrorMessage"] = "Cannot be empty!";
            setTextValueIntsSteps(stepsModified);
            return;
        }

        if (isNaN(Number(value))){
            stepsModified[index]["intErrorMessage"] = "No valid number!";
            setTextValueIntsSteps(stepsModified);
            return;       
        }

        stepsModified[index]["intErrorMessage"] = "";
        setTextValueIntsSteps(stepsModified);
    }

    const handleAddNewTextValueStepClick = (indexOfOptionBefore: number) => {
        setTextValueStepsErrorMessage("");
        if (textValueIntsSteps.length == criteriaConfig.maxTextValueAmount){
            return;
        }

        let newOption = {value: "", int: "", 
            valueErrorMessage: "", intErrorMessage: "", addButtonDisabled: false, removeButtonDisabled: false};
        let optionsNew = [...textValueIntsSteps];

        if (indexOfOptionBefore == textValueIntsSteps.length - 1){
            optionsNew.push(newOption);
        } else{
            optionsNew.splice(indexOfOptionBefore + 1, 0, newOption);
        }

        setTextValueIntsSteps(optionsNew);

        if (optionsNew.length == criteriaConfig.maxTextValueAmount){
            setTextValueStepsErrorMessage("Maximal amount of steps reached!");
        }
    }

    const handleRemoveTextValueStepClick = (index: number) => {
        setTextValueStepsErrorMessage("");
        let optionsNew = [...textValueIntsSteps];
        optionsNew.splice(index, 1);
        setTextValueIntsSteps(optionsNew);
        
        if (optionsNew.length < criteriaConfig.maxTextValueAmount){
            setTextValueStepsErrorMessage("");
        } 
    }

    const handleClose = () => setShowModal(false);

    const handleAboutClick = () => {
        navigate("/about");
    }

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleLogOutClick = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleYourCompaniesClick = () => {
        navigate("/yourcompanies");
    }

    return (
        <div id="atvcp-add-criterion-container">
            <div id="atvcp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>{clientName}</h3>
                <h3>New text-based criterion</h3>
            </div>
            <Card id="atvcp-add-criterion-card">
                <Card.Body>
                    <Form noValidate  onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" key="addForm.nameInput" controlId="addForm.nameInput">
                            <Form.Label>Criterion name</Form.Label>
                            <Form.Control isInvalid={!!criterionNameError} onChange={(e) => handleCriterionNameChange(e.target.value)} value={criterionName} type="text" placeholder="Enter the name of the criterion" required/>
                            <Form.Control.Feedback type="invalid">{criterionNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 atvcp-group-horizontal" key="addForm.minValueInput" controlId="addForm.minValueInput">
                           <div className="atvcp-group-horizontal-member atvcp-group-horizontal-left">
                                <Form.Label>Min value (Current: {minValue})</Form.Label>
                                <Form.Range value={minValue} onChange={(e) => handleMinValueChange(Number(e.target.value))} min={criteriaConfig.numericSmallestPossible} max={criteriaConfig.numericLargestPossible}/>
                                <div className="atvcp-axis-indicator-div">
                                    <div className="atvcp-axis-indicator-left">
                                        <h5>{criteriaConfig.numericSmallestPossible}</h5>
                                    </div>
                                    <div className="atvcp-axis-indicator-right">
                                        <h5>{criteriaConfig.numericLargestPossible}</h5>
                                    </div>
                                </div>
                                <span className="atvcp-error-background">{minValueError}</span>
                            </div>
                            <div className="atvcp-group-horizontal-member atvcp-group-horizontal-right">
                                <Form.Select onChange={(e) => handleMinValueEvaluatorChange(e.target.value)} value={minValueEvaluator} size="sm">
                                    <option value="best">Best</option>
                                    <option value="worst">Worst</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 atvcp-group-horizontal" key="addForm.maxValueInput" controlId="addForm.maxValueInput">
                            <div className="atvcp-group-horizontal-member atvcp-group-horizontal-left">
                                <Form.Label>Max value (Current: {maxValue})</Form.Label>
                                <Form.Range value={maxValue} onChange={(e) => handleMaxValueChange(Number(e.target.value))} min={criteriaConfig.numericSmallestPossible} max={criteriaConfig.numericLargestPossible} />
                                <div className="atvcp-axis-indicator-div">
                                    <div className="atvcp-axis-indicator-left">
                                        <h5>{criteriaConfig.numericSmallestPossible}</h5>
                                    </div>
                                    <div className="atvcp-axis-indicator-right">
                                        <h5>{criteriaConfig.numericLargestPossible}</h5>
                                    </div>
                                </div>
                                <span className="atvcp-error-background">{maxValueError}</span>
                            </div>
                            <div className="atvcp-group-horizontal-member atvcp-group-horizontal-right">
                                <Form.Select onChange={(e) => handleMaxValueEvaluatorChange(e.target.value)} value={maxValueEvaluator} size="sm">
                                    <option value="best">Best</option>
                                    <option value="worst">Worst</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <div id="atvcp-text-value-panel">
                            {textValueIntsSteps.length > 0 ? textValueIntsSteps.map((val, index) => (
                                <div className="atvcp-group-horizontal" key={"textIntDiv" + index}>
                                    <Form.Group className="mb-3" key={"textformgroup" + index} >
                                        <div className="atvcp-group-horizontal-member atvcp-text-value-int-left">
                                            <Form.Label htmlFor={"tcontrol" + index} id={"tlabel" + index} key={"formControlTextLabel" + index}>Criterion text</Form.Label>
                                            <Form.Control id={"tcontrol" + index} key={"formControlTextControl" + index} isInvalid={!!textValueIntsSteps[index]["valueErrorMessage"]}  onChange={(e) => handleChangedTextValue(e.target.value, index)} value={textValueIntsSteps[index]["value"]} type="text" placeholder="Enter the text" required/>
                                            <Form.Control.Feedback id={"tfeedback" + index} type="invalid" key={"formControlTextFeedback" + index}>{textValueIntsSteps[index]["valueErrorMessage"]}</Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" key={"ordformgroup" + index}>
                                        <div className="atvcp-group-horizontal-member atvcp-text-value-int-middle">
                                            <Form.Label htmlFor={"ocontrol" + index} id={"olabel" + index} key={"formControlOrdLabel" + index}>Criterion ordinal number</Form.Label>
                                            <Form.Control id={"ocontrol" + index} key={"formControlOrdControl" + index} isInvalid={!!textValueIntsSteps[index]["intErrorMessage"]} onChange={(e) => handleChangedOrdinalValue(e.target.value, index)} value={textValueIntsSteps[index]["int"]}  type="text" placeholder="Enter the ordinal value" required/>
                                            <Form.Control.Feedback id={"ofeedback" + index} type="invalid" key={"formControlOrdFeedback" + index}>{textValueIntsSteps[index]["intErrorMessage"]}</Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <div className="atvcp-group-horizontal-member atvcp-text-value-int-right">
                                        <div className="atvcp-add-remove-button-panel">
                                            <Button disabled={textValueIntsSteps[index]["addButtonDisabled"]} className="atvcp-add-remove-button-panel-button" variant="outline-primary" onClick={() => handleAddNewTextValueStepClick(index)}>
                                                <img src={plus} width={20} height={20}/>
                                            </Button>
                                            <Button disabled={textValueIntsSteps[index]["removeButtonDisabled"]} className="atvcp-add-remove-button-panel-button" variant="outline-danger" onClick={() => handleRemoveTextValueStepClick(index)}>
                                                <img src={minus} width={20} height={10}/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : null}
                        </div>
                        <div id="atvcp-text-value-ints-error-message-panel">
                            <span>{textValueStepsErrorMessage}</span>
                        </div>
                        <div id="atvcp-add-criterion-card-button-panel">
                            <Button className="atvcp-add-criterion-card-button-panel-button" variant="dark"  onClick={() => {navigate(-1)}}>Back</Button>
                            <Button type="submit" className="atvcp-add-criterion-card-button-panel-button" variant="dark">Submit</Button>
                        </div>
                    </Form>
                    <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                        onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
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
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddTextValueCriterionPage;