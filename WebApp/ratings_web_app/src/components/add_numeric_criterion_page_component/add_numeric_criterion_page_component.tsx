import { Button, Card, Figure, Form, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./add_numeric_criterion_page_component.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backendConfig from "../../config/backend.config.json";
import criteriaConfig from "../../config/criteria_settings.config.json";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { UsersService } from "../../services/users.service";
import { CriteriaService } from "../../services/criteria.service";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { Client } from "../../models/business_logic/client.model";

const AddNumericCriterionPage = () => {
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
    const [userId, setUserId] = useState(0);
    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState(0);
    const usersService = new UsersService(backendConfig.host + "/users");
    const criteriaService = new CriteriaService(backendConfig.host + "/criteria");

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

        let criterionToRegister = createCriterion();

        criteriaService.registerNumericCriterion(criterionToRegister)
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

    const handleCriterionNameChange = (criterionName: string) => {
        setCriterionName(criterionName);

        if (criterionName.length === 0){
            setCriterionNameError("Please enter a valid criterion name");
            return;
        } 

        setCriterionNameError("");
    }

    const handleMinValueChange = (changedMinValue: number) => {
        setMinValue(changedMinValue);

        if (changedMinValue >= maxValue){
            setMinValueError("Min value must be less than max value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");
    }

    const handleMinValueEvaluatorChange = (changedEvaluator: string) => {
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
        setMaxValue(changedMaxValue);

        if (changedMaxValue <= minValue){
            setMaxValueError("Max value be greater than min value!");
            return;
        }

        setMaxValueError("");
        setMinValueError("");
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

    const createCriterion = () : NumericCriterion => {
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

        return new NumericCriterion(0, clientId, criterionName, minValue, maxValue, worstValue, bestValue);
    }
    
    return (
        <div id="ancp-add-criterion-container">
            <div id="ancp-welcome-panel">
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
                <h3>New numeric criterion</h3>
            </div>
            <Card id="ancp-add-criterion-card">
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="addForm.nameInput">
                            <Form.Label>Criterion name</Form.Label>
                            <Form.Control isInvalid={!!criterionNameError} onChange={(e) => handleCriterionNameChange(e.target.value)} type="text" placeholder="Enter the name of the criterion" required/>
                            <Form.Control.Feedback type="invalid">{criterionNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 ancp-group-horizontal" controlId="addForm.minValueInput">
                        <div className="ancp-group-horizontal-member ancp-group-horizontal-left">
                                <Form.Label>Min value (Current: {minValue})</Form.Label>
                                <Form.Range value={minValue} onChange={(e) => handleMinValueChange(Number(e.target.value))} min={criteriaConfig.numericSmallestPossible} max={criteriaConfig.numericLargestPossible}/>
                                <div className="ancp-axis-indicator-div">
                                    <div className="ancp-axis-indicator-left">
                                        <h5>{criteriaConfig.numericSmallestPossible}</h5>
                                    </div>
                                    <div className="ancp-axis-indicator-right">
                                        <h5>{criteriaConfig.numericLargestPossible}</h5>
                                    </div>
                                </div>
                                <span className="ancp-error-background">{minValueError}</span>
                            </div>
                            <div className="ancp-group-horizontal-member ancp-group-horizontal-right">
                                <Form.Select onChange={(e) => handleMinValueEvaluatorChange(e.target.value)} value={minValueEvaluator} size="sm">
                                    <option value="best">Best</option>
                                    <option value="worst">Worst</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 ancp-group-horizontal" controlId="addForm.maxValueInput">
                           <div className="ancp-group-horizontal-member ancp-group-horizontal-left">
                                <Form.Label>Max value (Current: {maxValue})</Form.Label>
                                <Form.Range value={maxValue} onChange={(e) => handleMaxValueChange(Number(e.target.value))} min={criteriaConfig.numericSmallestPossible} max={criteriaConfig.numericLargestPossible} />
                                <div className="ancp-axis-indicator-div">
                                    <div className="ancp-axis-indicator-left">
                                        <h5>{criteriaConfig.numericSmallestPossible}</h5>
                                    </div>
                                    <div className="ancp-axis-indicator-right">
                                        <h5>{criteriaConfig.numericLargestPossible}</h5>
                                    </div>
                                </div>
                                <span className="ancp-error-background">{maxValueError}</span>
                            </div>
                            <div className="ancp-group-horizontal-member ancp-group-horizontal-right">
                                <Form.Select onChange={(e) => handleMaxValueEvaluatorChange(e.target.value)} value={maxValueEvaluator} size="sm">
                                    <option value="best">Best</option>
                                    <option value="worst">Worst</option>
                                </Form.Select>
                            </div>
                        </Form.Group>
                        <div id="ancp-add-criterion-card-button-panel">
                            <Button className="ancp-add-criterion-card-button-panel-button" variant="dark"  onClick={() => {navigate(-1)}}>Back</Button>
                            <Button type="submit" className="ancp-add-criterion-card-button-panel-button" variant="dark">Submit</Button>
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

export default AddNumericCriterionPage;