import { Figure } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./about_page_component.css";
import backendConfig from '../../config/backend.config.json';
import { UsersService } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";

const AboutPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const usersService = new UsersService(backendConfig.host + "/users");

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
        <div id="ap-container">
            <div id="ap-welcome-panel">
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
            <span>This is a simple company rating app made by Stefan Chvala</span>
            <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                         onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
        </div>
    );
};

export default AboutPage;