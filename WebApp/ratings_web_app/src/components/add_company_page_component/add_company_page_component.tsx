import { Button, Card, Figure, Modal } from 'react-bootstrap';
import logo from "../../assets/logo.png";
import './add_company_page_component.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import backendConfig from '../../config/backend.config.json';
import clientsConfig from '../../config/company_settings.config.json';
import { UsersService } from '../../services/users.service';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/business_logic/client.model';
import Sidebar from '../sidebar_menu_component/sidebar_menu_component';
import { useNavigate } from 'react-router-dom';


const AddCompanyPage = () => {
    const [companyName, setCompanyName] = useState("");
    const [streetName, setStreetName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [cityName, setCityName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");
    const [streetNameError, setStreetNameError] = useState("");
    const [cityNameError, setCityNameError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [countryNameError, setCountryNameError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();
    const usersService = new UsersService(backendConfig.host + "/users");
    const clientsService = new ClientsService(backendConfig.host + "/clients");

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

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        if (companyName.length === 0){
            setCompanyNameError("Please enter a valid company name");
            return;
        } 

        if (companyName.length > clientsConfig.maxCompanyLength){
            setCompanyNameError(`Please enter a valid company name (max ${clientsConfig.maxCompanyLength})`);
            return;
        }

        setCompanyNameError("");

        if (streetName.length === 0){
            setStreetNameError("Please enter a valid street name");
            return;
        } 

        setStreetNameError("");

        if (cityName.length === 0){
            setCityNameError("Please enter a valid city name");
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

        let client = {id: 0, name: companyName, street: streetName, city: cityName, country: countryName, postalCode: postalCode, userId: userId} as Client;
        clientsService.registerClient(client).then((response) => {
            setModalMessage("The company was successfully registered!");
            setShowModal(true);
        }).catch((error) => {
            setModalMessage(`Some error occurred during the company registration!`);
            setShowModal(true);  
        })
    };

    const handleCompanyNameChange = (companyName: string) => {
        setCompanyName(companyName);

        if (companyName.length === 0){
            setCompanyNameError("Please enter a valid company name");
            return;
        } 

        if (companyName.length > clientsConfig.maxCompanyLength){
            setCompanyNameError(`Please enter a valid company name (max ${clientsConfig.maxCompanyLength})`);
            return;
        }

        setCompanyNameError("");
    }

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

    return(
        <div id="acp-add-company-container">
            <div id="acp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>New company</h3>
            </div>
            <Card id="acp-add-company-card">
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="addCompanyForm.companyNameInput">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control isInvalid={!!companyNameError} onChange={(e) => handleCompanyNameChange(e.target.value)} type="text" placeholder="Enter the name of the company" required/>
                            <Form.Control.Feedback type="invalid">{companyNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addCompanyForm.streetInput">
                            <Form.Label>Street</Form.Label>
                            <Form.Control isInvalid={!!streetNameError} onChange={(e) => handleStreetNameChange(e.target.value)} type="text" placeholder="Enter the name of the street" required/>
                            <Form.Control.Feedback type="invalid">{streetNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addCompanyForm.cityInput">
                            <Form.Label>City</Form.Label>
                            <Form.Control isInvalid={!!cityNameError} onChange={(e) => handleCityNameChange(e.target.value)} type="text" placeholder="Enter the name of the city" required/>
                            <Form.Control.Feedback type="invalid">{cityNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addCompanyForm.postalCodeInput">
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control isInvalid={!!postalCodeError} onChange={(e) => handlePostalCodeChange(e.target.value)} type="text" placeholder="Enter the postal code" required/>
                            <Form.Control.Feedback type="invalid">{postalCodeError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addCompanyForm.countryInput">
                            <Form.Label>Country</Form.Label>
                            <Form.Control isInvalid={!!countryNameError} onChange={(e) => handleCountryChange(e.target.value)} type="text" placeholder="Enter the country" required/>
                            <Form.Control.Feedback type="invalid">{countryNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="acp-add-criterion-card-button-panel">
                             <Button className="acp-panel-button"  variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
                             <Button className="acp-panel-button" type="submit" variant="dark">Create</Button>
                        </div>
                        <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
                    </Form>
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

export default AddCompanyPage;