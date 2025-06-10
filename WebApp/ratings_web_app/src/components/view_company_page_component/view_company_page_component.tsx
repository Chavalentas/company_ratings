import { useEffect, useState } from "react";
import backendConfig from '../../config/backend.config.json';
import { UsersService } from "../../services/users.service";
import { useLocation, useNavigate } from "react-router-dom";
import { Client } from "../../models/business_logic/client.model";
import { Button, Card, Figure, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { ClientsService } from "../../services/clients.service";
import "./view_company_page_component.css"
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";

const ViewCompanyPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const [showDeleteEntryModal, setShowDeleteEntryModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState("");
    const [isCompanyDeleted, setIsCompanyDeleted] = useState(false);
    const usersService = new UsersService(backendConfig.host + "/users");
    const clientsService = new ClientsService(backendConfig.host + "/clients");
    const location = useLocation();
    const clientToView = location.state as Client;
    
    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
        }).catch((error) => {
            navigate("/login");
            return;
        })
    }, []);

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

    const handleDeleteEntryClick = () => {
        if (isCompanyDeleted){
            setInfoModalMessage("You already deleted the company!");
            setShowInfoModal(true);
            return;
        }

        setShowDeleteEntryModal(true);
    }

    const handleConfirmDeleteEntryClick = async() => {
        setShowDeleteEntryModal(false);
        clientsService.deleteClient(clientToView.id).then((response) => {
            setInfoModalMessage("The company was successfully deleted!");
            clientToView.name = clientToView.name + " (non-existent)"
            setShowInfoModal(true);   
            setIsCompanyDeleted(true);
        })
        .catch((error) => {
            setInfoModalMessage("The delete operation failed!");
            setShowInfoModal(true);
        })
    };

    const handleCriteriaClick = () => {
        if (isCompanyDeleted){
            setInfoModalMessage("You already deleted the company!");
            setShowInfoModal(true);
            return;
        }
        
        navigate('/userscompanycriteria', { state: clientToView });
    }

    return(
        <div id="vcpp-view-company-container">
            <div id="vcpp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>{clientToView.name}</h3>
            </div>
            <Card id="vcpp-view-company-card">
                <Card.Body>
                    <div id="vcpp-view-company-card-body-container">
                        <div className="vcpp-identifier-value-container">
                            <div className="vcpp-identifier-container">
                                 <h4>Name</h4>
                            </div>
                            <div className="vcpp-value-container">
                                <span>{clientToView.name}</span>
                            </div>
                        </div>
                        <div className="vcpp-identifier-value-container">
                            <div className="vcpp-identifier-container">
                                 <h4>Street</h4>
                            </div>
                            <div className="vcpp-value-container">
                              <span>{clientToView.street}</span>
                            </div>
                        </div>
                        <div className="vcpp-identifier-value-container">
                            <div className="vcpp-identifier-container">
                                 <h4>City</h4>
                            </div>
                            <div className="vcpp-value-container">
                                 <span>{clientToView.city}</span>
                            </div>
                        </div>
                        <div className="vcpp-identifier-value-container">
                            <div className="vcpp-identifier-container">
                               <h4>Postal code</h4>
                            </div>
                            <div className="vcpp-value-container">
                               <span>{clientToView.postalCode}</span>
                            </div>
                        </div>    
                    </div>
                    <div id="vcpp-view-card-button-panel">
                        <Button className="vcpp-panel-button" id="vcpp-register-button" variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
                        <Button className="vcpp-panel-button" id="vcpp-criteria-button" variant="dark" onClick={() => {handleCriteriaClick()}}>Criteria</Button>
                        <Button className="vcpp-panel-button" id="vcpp-delete-button" variant="danger" onClick={() => handleDeleteEntryClick()}>Delete</Button>
                    </div>
                    <Modal id="vcpp-delete-entry-modal" show={showDeleteEntryModal} onHide={() => setShowDeleteEntryModal(false)}>
                        <Modal.Header closeButton>
                                <Modal.Title>Info</Modal.Title>
                        </Modal.Header>
                                <Modal.Body>Are you sure you want to delete the company? (This cannot be undone!)</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowDeleteEntryModal(false)}>
                                No
                            </Button>
                            <Button variant="secondary" onClick={() => handleConfirmDeleteEntryClick()}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal id="vcpp-info-modal" show={showInfoModal} onHide={() => setShowInfoModal(false)}>
                            <Modal.Header closeButton>
                                    <Modal.Title>Info</Modal.Title>
                            </Modal.Header>
                                    <Modal.Body>{infoModalMessage}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowInfoModal(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                    </Modal>
                    <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
                </Card.Body>
            </Card>
        </div>
    )
};

export default ViewCompanyPage;