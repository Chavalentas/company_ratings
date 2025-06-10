import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import backendConfig from '../../config/backend.config.json';
import clientConfig from '../../config/company_settings.config.json';
import { UsersService } from "../../services/users.service";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import refresh from "../../assets/refresh.png";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import "./home_page_component.css";
import { Button, Figure, Form, ListGroup, Spinner } from "react-bootstrap";
import { Client } from "../../models/business_logic/client.model";
import { ClientsService } from "../../services/clients.service";

const HomePage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const [searchPattern, setSearchPattern] = useState("");
    const [patternChanged, setPatternChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentClients, setCurrentClients] = useState<Client[]>([]);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);
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
            setIsSpinnerVisible(true);
            clientsService.searchForClients(searchPattern)
            .then((response)  => {
                setCurrentClients([]);
                setCurrentClients(response.result);
            })
            .catch((err) => {
                navigate("/login");
            })
            .finally(() => {
                setIsSpinnerVisible(false);
            })
        }).catch((error) => {
            navigate("/login");
            return;
        })
    }, []);

    const handleAboutClick = () => {
        navigate("/about");
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

    const handleClientClick = (client: Client) => {
        navigate('/companycriteria', { state: client});
    }

    const handleRefreshClientsClick = async() => {
        setPatternChanged(false);
        setIsSpinnerVisible(true);
        setCurrentClients([]);

        clientsService.searchForClients(searchPattern)
        .then((response)  => {
            setCurrentClients(response.result);
        })
        .catch((err) => {
            setErrorMessage("Failed to fetch further clients!");
        })
        .finally(() => {
            setIsSpinnerVisible(false);
        })
    }

    const handleSearchClick = async() => {
        let offsetNew = 0;
        setPatternChanged(false);
        setIsSpinnerVisible(true);
        setErrorMessage("");
        setCurrentClients([]);

        clientsService.searchForClients(searchPattern)
        .then((response)  => {
            setCurrentClients(response.result);
        })
        .catch((err) => {
            setErrorMessage("Failed to fetch further clients!");
        })
        .finally(() => {
            setIsSpinnerVisible(false);
        })
    }

    const handleSearchPatternChange = (newSearchPattern: string) => {
        if (newSearchPattern != searchPattern){
            setPatternChanged(true);
        }

        setSearchPattern(newSearchPattern);
    }

    return (
        <div id="hp-welcome-container">
            <div id="hp-welcome-panel">
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
            <div id="hp-search-bar-container">
                <Form.Group className="mb-3 hp-search-bar-container-member" id="hp-search-bar">
                    <Form.Control id="hp-search-bar-control" onChange={(e) => handleSearchPatternChange(e.target.value)} type="text" placeholder="Search for a company (leave empty to see all)" />
               </Form.Group>
               <Button className="hp-search-bar-container-member" id="hp-search-button" variant="dark" onClick={() => handleSearchClick()}>
                    <img src={search} width={30} height={30}/>
               </Button>
            </div>
            <div id="hp-companies-list">
                <ListGroup>
                    {currentClients.length > 0 ? currentClients.map(client => (
                        <ListGroup.Item action onClick={() => handleClientClick(client)} className="d-flex justify-content-between align-items-center hp-company-list-item" key={client.id}>
                            <div className="hp-item-container">
                                <div className="hp-item-member-name-panel">
                                    <span className="hp-item-member">{client.name}</span>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )): 
                    <h5>No search results available</h5>}
                </ListGroup>
            </div>
            {isSpinnerVisible ? 
            <Spinner  animation="border" role="status" id="hp-loading-spinner">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            : null}
            <div id="hp-home-page-button-panel">
                <Button className="hp-home-page-button-panel-button" variant="dark" onClick={() => handleRefreshClientsClick()}>
                    <img src={refresh} width={20} height={20}/>     
                </Button>
            </div>
            <div id="hp-error-panel">
                <span>{errorMessage}</span>
            </div>
          <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => {}} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
        </div>
    );
}

export default HomePage;