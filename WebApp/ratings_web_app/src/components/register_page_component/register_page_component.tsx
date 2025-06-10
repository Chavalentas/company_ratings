import "./register_page_component.css";
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import logo from "../../assets/logo.png";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userConfig from '../../config/user_settings.config.json';
import backendConfig from '../../config/backend.config.json';
import { useState } from "react";
import { PasswordValidationService } from "../../services/password_validation.service";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/business_logic/user.model";
import Modal from 'react-bootstrap/Modal';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [userNameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const passwordValidationService = new PasswordValidationService(userConfig.minPasswordLength);
    const usersService = new UsersService(backendConfig.host + "/users");

    const handleClose = () => setShowModal(false);

    
    const handleSubmit = async(event: any) => {
        event.preventDefault();

        let isValidPasswordTask = passwordValidationService.isPasswordValidAsync(password);

        if (firstName.length === 0){
            setFirstNameError("Please enter a valid first name");
            return;
        } 

        setFirstNameError("");

        if (lastName.length === 0){
            setLastNameError("Please enter a valid last name");
            return;
        } 

        setLastNameError("");

        if (userName.length === 0){
            setUsernameError("Please enter a valid username");
            return;
        } 

        setUsernameError("");

        if (password.length === 0){
            setPasswordError("Please enter a valid password");
            return;
        }

        let isValid = await isValidPasswordTask;

        if (!isValid){
            setPasswordError(`The password must contain at least one uppercase, lowercase, digit and special character (min. length ${userConfig.minPasswordLength})`);
            return;
        }

        setPasswordError("");

        if (password != repeatedPassword){
            setRepeatedPasswordError("The passwords do not match!");
            return;
        }

        setRepeatedPasswordError("");

        // Register the user
        let user = {id : 0, firstName: firstName, lastName: lastName, userName: userName, password: password} as User;
        usersService.registerUser(user).then((response) => {
            setModalMessage("You were successfully registered! You can log in now!");
            setShowModal(true);
        }).catch((error) => {
            setModalMessage(`Some error occurred during the registration!`);
            setShowModal(true);  
        })
    };

    const handleFirstnameChange = (firstName: string) => {
        setFirstName(firstName);

        if (firstName.length === 0){
            setFirstNameError("Please enter a valid first name");
            return;
        } 

        setFirstNameError("");
    }

    const handleLastnameChange = (lastName: string) => {
        setLastName(lastName);

        if (lastName.length === 0){
            setLastNameError("Please enter a valid last name");
            return;
        } 

        setLastNameError("");
    }

    const handleUsernameChange = (username: string) => {
        setUsername(username);

        if (username.length === 0){
            setUsernameError("Please enter a valid username");
            return;
        } 

        setUsernameError("");
    }

    const handlePasswordChange = async(password: string) => {
        setPassword(password);

        if (password.length === 0){
            setPasswordError("Please enter a valid password");
            return;
        }

        let isValid = await passwordValidationService.isPasswordValidAsync(password);

        if (!isValid){
            setPasswordError(`The password must contain at least one uppercase, lowercase, digit and special character (min. length ${userConfig.minPasswordLength})`);
            return;
        }

        setPasswordError("");
    }

    const handleRepeatedPasswordChange = (repeatedPassword: string) => {
        setRepeatedPassword(repeatedPassword);

        if (password != repeatedPassword){
            setRepeatedPasswordError("The passwords do not match!");
            return;
        }

        setRepeatedPasswordError("");
    }

    return (
        <div id="rp-register-container">
            <div id="rp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
            </div>
            <Card id="rp-register-card">
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="registerform.firstNameInput">
                            <Form.Label>First name</Form.Label>
                            <Form.Control isInvalid={!!firstNameError} onChange={(e) => handleFirstnameChange(e.target.value)} type="text" placeholder="Enter your first name" required/>
                            <Form.Control.Feedback type="invalid">{firstNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginform.lastNameInput">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control isInvalid={!!lastNameError} onChange={(e) => handleLastnameChange(e.target.value)} type="text" placeholder="Enter your last name" required/>
                            <Form.Control.Feedback type="invalid">{lastNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerform.usernameInput">
                            <Form.Label>Username</Form.Label>
                            <Form.Control isInvalid={!!userNameError} onChange={(e) => handleUsernameChange(e.target.value)} type="text" placeholder="Enter your username" required/>
                            <Form.Control.Feedback type="invalid">{userNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginform.passwordInput">
                            <Form.Label>Password</Form.Label>
                            <Form.Control isInvalid={!!passwordError} onChange={async(e) => await handlePasswordChange(e.target.value)} type="password" placeholder="Enter your password" required/>
                            <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginform.repeatedPasswordInput">
                            <Form.Control isInvalid={!!repeatedPasswordError} onChange={(e) => handleRepeatedPasswordChange(e.target.value)} type="password" placeholder="Repeat your password" required/>
                            <Form.Control.Feedback type="invalid">{repeatedPasswordError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="rp-register-card-button-panel">
                             <Button type="submit" id="rp-register-button" variant="dark">Create an account</Button>
                        </div>
                        <div id="rp-register-notification-panel">
                            <span>Already registered? &nbsp;</span>
                            <a href="/">Log in</a>
                        </div>
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
  
  export default RegisterPage;