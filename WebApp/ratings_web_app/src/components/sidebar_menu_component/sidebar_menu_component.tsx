import { SidebarMenuProps } from "../../props/siderbar_menu.props";
import "./sidebar_menu_component.css";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Sidebar = (props: SidebarMenuProps) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    
    return(
        <>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                >
                    <div>
                        <ListGroup>
                            <ListGroup.Item action onClick={() => props.onHomeClick()}>
                                Home
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => props.onProfileClick()}>
                                Profile
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => props.onYourCompaniesClick()}>
                                Your companies
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => props.onAboutClick()}>
                                About
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={() => props.onLogOutClick()}>
                                Log out
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Drawer>
               <Button id="sm-toggle-button" variant="dark" onClick={toggleDrawer}>Menu</Button>
        </>
    );
};

export default Sidebar;