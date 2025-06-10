import { Button, Card, Figure, Form, Modal } from 'react-bootstrap';
import logo from "../../assets/logo.png";
import './update_company_page_component.css';
import Sidebar from '../sidebar_menu_component/sidebar_menu_component';
import backendConfig from '../../config/backend.config.json';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UsersService } from '../../services/users.service';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/business_logic/client.model';

const UpdateCompanypage = () => {
    const [streetName, setStreetName] = useState("");
    const [cityName, setCityName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [streetNameError, setStreetNameError] = useState("");
    const [countryNameError, setCountryNameError] = useState("");
    const [clientId, setClientId] = useState(0);
    const [cityNameError, setCityNameError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [showDeleteEntryModal, setShowDeleteEntryModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState("");
    const [isCompanyDeleted, setIsCompanyDeleted] = useState(false);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    const usersService = new UsersService(backendConfig.host + "/users");
    const clientsService = new ClientsService(backendConfig.host + "/clients");
    const location = useLocation();

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
            let clientToUpdate = location.state as Client;
            setStreetName(clientToUpdate.street);
            setCompanyName(clientToUpdate.name);
            setCityName(clientToUpdate.city);
            setPostalCode(clientToUpdate.postalCode);
            setClientId(clientToUpdate.id);
            setCountryName(clientToUpdate.country);
        }).catch((error) => {
            navigate("/login");
            return;
        })
    }, []);

    const handleClose = () => setShowInfoModal(false);

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

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        if (isCompanyDeleted){
            setInfoModalMessage("You already deleted the company!");
            setShowInfoModal(true);
            return;
        }


        if (streetName.length === 0){
            setStreetNameError("Please enter a valid street name");
            return;
        } 

        setStreetNameError("");

        if (cityName.length === 0){
            setStreetNameError("Please enter a valid city name");
            return;
        } 

        setCityNameError("");

        if (postalCode.length === 0){
            setPostalCodeError("Please enter a valid postal code");
            return;
        } 

        setPostalCodeError("");

        if (countryName.length === 0){
            setCountryNameError("Please enter a valid country name");
            return;
        } 

        setCountryNameError("");

        let client = {id: clientId, name: companyName, street: streetName, country: countryName, city: cityName, postalCode: postalCode, userId: userId} as Client;
        clientsService.updateClient(client, clientId).then((response) => {
            setInfoModalMessage("The company was successfully updated!");
            setShowInfoModal(true);
        }).catch((error) => {
            setInfoModalMessage(`Some error occurred during the company update!`);
            setShowInfoModal(true);  
        })
    };

    const handleStreetNameChange = (streetName: string) => {
        setStreetName(streetName);

        if (streetName.length === 0){
            setStreetNameError("Please enter a valid street name");
            return;
        } 

        setStreetNameError("");
    }

    const handleCityNameChange = (cityName: string) => {
        setCityName(cityName);

        if (cityName.length === 0){
            setCityNameError("Please enter a valid city name");
            return;
        } 

        setCityNameError("");
    }

    const handlePostalCodeChange = (postalCode: string) => {
        setPostalCode(postalCode);

        if (postalCode.length === 0){
            setPostalCodeError("Please enter a valid postal code");
            return;
        } 

        setPostalCodeError("");
    }

    const handleCountryChange = (country: string) => {
        setCountryName(country);

        if (country.length === 0){
            setCountryNameError("Please enter a valid country name");
            return;
        } 

        setCountryNameError("");
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
        clientsService.deleteClient(clientId).then((response) => {
            setInfoModalMessage("The company was successfully deleted!");
            setCompanyName(companyName + " (non-existent)")
            setShowInfoModal(true);  
            setIsCompanyDeleted(true); 
        })
        .catch((error) => {
            setInfoModalMessage("The delete operation failed!");
            setShowInfoModal(true);
        })
    };
    
    return(
        <div id="ucp-update-company-container">
            <div id="ucp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>Update {companyName}</h3>
            </div>
            <Card id="ucp-update-company-card">
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="updateCompanyForm.streetInput">
                            <Form.Label>Street</Form.Label>
                            <Form.Control value={streetName} isInvalid={!!streetNameError} onChange={(e) => handleStreetNameChange(e.target.value)} type="text" placeholder="Enter the name of the street" required/>
                            <Form.Control.Feedback type="invalid">{streetNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updateCompanyForm.cityInput">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={cityName} isInvalid={!!cityNameError} onChange={(e) => handleCityNameChange(e.target.value)} type="text" placeholder="Enter the name of the city" required/>
                            <Form.Control.Feedback type="invalid">{cityNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updateCompanyForm.postalCodeInput">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control value={postalCode} isInvalid={!!postalCodeError} onChange={(e) => handlePostalCodeChange(e.target.value)} type="text" placeholder="Enter the postal code" required/>
                            <Form.Control.Feedback type="invalid">{postalCodeError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updateCompanyForm.countryInput">
                            <Form.Label>Country</Form.Label>
                            <Form.Control value={countryName} isInvalid={!!countryNameError} onChange={(e) => handleCountryChange(e.target.value)} type="text" placeholder="Enter the country" required/>
                            <Form.Control.Feedback type="invalid">{countryNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="ucp-update-company-card-button-panel">
                             <Button className="ucp-panel-button" id="ucp-back-button" variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
                             <Button className="ucp-panel-button" type="submit" id="ucp-update-company-button" variant="dark">Update</Button>
                             <Button className="ucp-panel-button" id="ucp-remove-company-button" variant="danger" onClick={() => handleDeleteEntryClick()}>Delete</Button>
                        </div>
                        <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
                    </Form>
                    <Modal id="ucp-delete-entry-modal" show={showDeleteEntryModal} onHide={() => setShowDeleteEntryModal(false)}>
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
                    <Modal show={showInfoModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                             <Modal.Title>Info</Modal.Title>
                        </Modal.Header>
                             <Modal.Body>{infoModalMessage}</Modal.Body>
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
}

export default UpdateCompanypage;