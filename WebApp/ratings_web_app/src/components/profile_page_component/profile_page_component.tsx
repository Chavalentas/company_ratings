import { Button, Card, Figure, Form, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./profile_page_component.css";
import { useEffect, useState } from "react";
import { UsersService } from "../../services/users.service";
import { PasswordValidationService } from "../../services/password_validation.service";
import userConfig from '../../config/user_settings.config.json';
import backendConfig from '../../config/backend.config.json';
import { useNavigate } from "react-router-dom";
import { User } from "../../models/business_logic/user.model";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [userNameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
    const [userId, setUserId] = useState(0);
    const passwordValidationService = new PasswordValidationService(userConfig.minPasswordLength);
    const usersService = new UsersService(backendConfig.host + "/users");

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
            usersService.getUser(response.userId)
            .then((user) => {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setUsername(user.userName);
            }).catch((error) => {
                navigate("/login");
                return;
            })
        }).catch((error) => {
            navigate("/login");
            return;
        })
    }, []);

    const handleClose = () => setShowModal(false);

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

    const handleYourCompaniesClick = () => {
        navigate("/yourcompanies");
    }

    const handleUpdateProfileClick = async() => {
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

        // update the user
        let user = {id : userId, firstName: firstName, lastName: lastName, userName: userName, password: password} as User;
        usersService.updateUser(user, userId).then((response) => {
            setModalMessage("Your account was successfully updated!");
            setShowModal(true);
        }).catch((error) => {
            setModalMessage(`Some error occurred during the profile update!`);
            setShowModal(true);  
        })
    }

    const handleUpdatePasswordClick = async() => {
        let isValidPasswordTask = passwordValidationService.isPasswordValidAsync(password);

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
        usersService.updatePassword(userId, password).then((response) => {
            setModalMessage("Your password was successfully updated!");
            setShowModal(true);
        }).catch((error) => {
            setModalMessage(`Some error occurred during the password update!`);
            setShowModal(true);  
        })
    }

    const handleDeleteProfileClick = () => {
        setShowDeleteProfileModal(true);
    }

    const handleConfirmDeleteProfileClick = async() => {
        usersService.deleteUser(userId).then((response) => {
            localStorage.removeItem("token");
            navigate("/login");
        }).catch((error) => {
            setModalMessage(`Some error occurred during the delete operation!`);
            setShowModal(true);  
        })
    }

    return (
        <div id="pp-profile-container">
            <div id="pp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>Your profile</h3>
            </div>
            <Card id="pp-profile-card">
                <Card.Body>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="profileForm.firstNameInput">
                            <Form.Label>First name</Form.Label>
                            <Form.Control value={firstName} isInvalid={!!firstNameError} onChange={(e) => handleFirstnameChange(e.target.value)} type="text" placeholder="Enter your first name" required/>
                            <Form.Control.Feedback type="invalid">{firstNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileForm.lastNameInput">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control value={lastName} isInvalid={!!lastNameError} onChange={(e) => handleLastnameChange(e.target.value)} type="text" placeholder="Enter your last name" required/>
                            <Form.Control.Feedback type="invalid">{lastNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="profileForm.userNameInput">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={userName} isInvalid={!!userNameError} onChange={(e) => handleUsernameChange(e.target.value)} type="text" placeholder="Enter your username" required/>
                            <Form.Control.Feedback type="invalid">{userNameError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="pp-update-profile-button-panel">
                             <Button className="pp-update-profile-panel-button" variant="dark" onClick={() => handleUpdateProfileClick()}>Update profile</Button>
                        </div>
                        <Form.Group className="mb-3" controlId="loginform.passwordInput">
                            <Form.Label>Password</Form.Label>
                            <Form.Control isInvalid={!!passwordError} onChange={async(e) => await handlePasswordChange(e.target.value)} type="password" placeholder="Enter your password" required/>
                            <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginform.repeatedPasswordInput">
                            <Form.Control isInvalid={!!repeatedPasswordError} onChange={(e) => handleRepeatedPasswordChange(e.target.value)} type="password" placeholder="Repeat your password" required/>
                            <Form.Control.Feedback type="invalid">{repeatedPasswordError}</Form.Control.Feedback>
                        </Form.Group>
                        <div id="pp-update-password-button-panel">
                             <Button className="pp-update-password-panel-button" variant="dark" onClick={async() => await handleUpdatePasswordClick()}>Update password</Button>
                        </div>
                        <div id="pp-delete-profile-button-panel">
                             <Button className="pp-delete-profile-panel-button" variant="danger" onClick={() => handleDeleteProfileClick()}>Delete</Button>
                        </div>
                        <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => {}} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
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
                    <Modal id="pp-delete-entry-modal" show={showDeleteProfileModal} onHide={() => setShowDeleteProfileModal(false)}>
                        <Modal.Header closeButton>
                                <Modal.Title>Info</Modal.Title>
                        </Modal.Header>
                                <Modal.Body>Are you sure you want to delete your profile? (This cannot be undone!)</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setShowDeleteProfileModal(false)}>
                                No
                            </Button>
                            <Button variant="secondary" onClick={() => handleConfirmDeleteProfileClick()}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfilePage;