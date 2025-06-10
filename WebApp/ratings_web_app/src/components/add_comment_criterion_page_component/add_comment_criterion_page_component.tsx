import "./add_comment_criterion_page_component.css";
import { Button, Card, Figure, Form, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backendConfig from "../../config/backend.config.json";
import criteriaConfig from "../../config/criteria_settings.config.json";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { UsersService } from "../../services/users.service";
import { CriteriaService } from "../../services/criteria.service";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { Client } from "../../models/business_logic/client.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";

const AddCommentCriterionPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
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

        let criterionToRegister = new CommentCriterion(0, clientId, criterionName);

        criteriaService.registerCommentCriterion(criterionToRegister)
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
        <div id="adcp-add-criterion-container">
            <div id="adcp-welcome-panel">
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
                <h3>New comment criterion</h3>
            </div>
            <Card id="adcp-add-criterion-card">
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="addForm.nameInput">
                            <Form.Label>Criterion name</Form.Label>
                            <Form.Control isInvalid={!!criterionNameError} onChange={(e) => handleCriterionNameChange(e.target.value)} type="text" placeholder="Enter the name of the criterion" required/>
                            <Form.Control.Feedback type="invalid">{criterionNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="adcp-add-criterion-card-button-panel">
                            <Button className="adcp-add-criterion-card-button-panel-button" variant="dark"  onClick={() => {navigate(-1)}}>Back</Button>
                            <Button type="submit" className="adcp-add-criterion-card-button-panel-button" variant="dark">Submit</Button>
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

export default AddCommentCriterionPage;