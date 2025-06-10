import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import logo from "../../assets/logo.png";
import { Button, Figure, ListGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Client } from "../../models/business_logic/client.model";
import backendConfig from '../../config/backend.config.json';
import "./users_companies_page_component.css";
import { ClientsService } from "../../services/clients.service";
import { UsersService } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { Helper } from "../../models/business_logic/helper.model";

const UsersCompaniesPage = () => {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState<Client[]>([]);
    const [userId, setUserId] = useState(0);
    const [showDeleteAllEntriesModal, setShowDeleteAllEntriesModal] = useState(false);
    const [showDeleteEntryModal, setShowDeleteEntryModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState("");
    const [entryToDelete, setEntryToDelete] = useState<Client>({} as Client);
    const clientsService = new ClientsService(backendConfig.host + "/clients");
    const usersService = new UsersService(backendConfig.host + "/users");

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
            clientsService.getClientsByUserId(response.userId).then((response) => {
                let clients = sortClientsByName(response.result);
                setCompanies(clients);
            }).catch((error) => {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            })
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

    const handleViewCompanyClick = (company: Client) => {
        navigate('/viewcompany', { state: company });
    }

    const handleUpdateCompanyClick = (company: Client) => {
        navigate('/updatecompany', { state: company });
    }

    const handleDeleteCompanyClick = (company: Client) => {
        setEntryToDelete(company);
        setShowDeleteEntryModal(true);
    }

    const handleNewCompanyClick = () => {
        navigate("/addcompany");
    }

    const handleDeleteAllClick = () => {
        if (companies.length === 0){
            return;
        }

        setShowDeleteAllEntriesModal(true);
    }

    const handleConfirmDeleteAllClick = async() => {
        if (companies.length === 0){
            return;
        }

        setShowDeleteAllEntriesModal(false);
        clientsService.deleteClientsForUser(userId).then((response) => {
            setCompanies([]);
            setInfoModalMessage("The companies were successfully deleted!");
            setShowInfoModal(true);
        })
        .catch((error) => {
            setInfoModalMessage("The delete operation failed!");
            setShowInfoModal(true);
        })
    }

    const handleConfirmDeleteEntryClick = async() => {
        setShowDeleteEntryModal(false);
        clientsService.deleteClient(entryToDelete.id).then((response) => {
            let newCompanies = companies.filter(c => c.id != entryToDelete.id);
            newCompanies = newCompanies.sort((a, b) => Helper.normalize(a.name) < Helper.normalize(b.name) ? -1 : Helper.normalize(a.name) > Helper.normalize(b.name) ? 1 : 0);
            setCompanies(newCompanies);
            setInfoModalMessage("The company was successfully deleted!");
            setShowInfoModal(true);    
        })
        .catch((error) => {
            setInfoModalMessage("The delete operation failed!");
            setShowInfoModal(true);
        })
    }

    const handleCriteriaClick = (client: Client) => {
        navigate('/userscompanycriteria', { state: client });
    }

    const sortClientsByName = (clients: Client[]): Client[] => {
        return clients.sort((a, b) => Helper.normalize(a.name) < Helper.normalize(b.name) ? -1 : Helper.normalize(a.name) > Helper.normalize(b.name) ? 1 : 0);
    }

    return (
        <div id="uscp-companies-container">
            <div id="uscp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>Your companies</h3>
            </div>
            <div id="uscp-companies-list">
                <ListGroup>
                    {companies.length > 0 ? companies.map(client => (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center" key={client.id}>
                            <div className="uscp-item-container">
                                <div className="uscp-item-member-name-panel">
                                <span className="uscp-item-member">{client.name}</span>
                               </div>
                                <div className="uscp-item-member-button-panel">
                                    <Button className="uscp-item-member" variant="dark" onClick={() => handleViewCompanyClick(client)}>View</Button>
                                    <Button className="uscp-item-member" variant="dark" onClick={() => handleUpdateCompanyClick(client)}>Update</Button>
                                    <Button className="uscp-item-member" variant="dark" onClick={() => handleCriteriaClick(client)}>Criteria</Button>
                                    <Button className="uscp-item-member" variant="danger" onClick={() => handleDeleteCompanyClick(client)}>Delete</Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )): 
                    <h3>No companies available!</h3>}
                </ListGroup>
            </div>
            <div id="uscp-user-companies-button-panel">
                <Button  className="uscp-user-companies-button-panel-button" variant="dark" onClick={() => handleNewCompanyClick()}>New company</Button>
                <Button  className="uscp-user-companies-button-panel-button"  variant="danger" onClick={() => handleDeleteAllClick()}>Delete all</Button>
            </div>
            <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
            onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => {}}/>
            <Modal id="uscp-delete-all-entries-modal" show={showDeleteAllEntriesModal} onHide={() => setShowDeleteAllEntriesModal(false)}>
                <Modal.Header closeButton>
                        <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                        <Modal.Body>Are you sure you want to delete all companies? (This cannot be undone!)</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDeleteAllEntriesModal(false)}>
                        No
                    </Button>
                    <Button variant="secondary" onClick={() => handleConfirmDeleteAllClick()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal id="uscp-delete-entry-modal" show={showDeleteEntryModal} onHide={() => setShowDeleteEntryModal(false)}>
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
            <Modal id="uscp-info-modal" show={showInfoModal} onHide={() => setShowInfoModal(false)}>
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
        </div>
    );
}

export default UsersCompaniesPage;