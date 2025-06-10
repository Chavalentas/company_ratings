import "./view_criterion_page_component.css";
import { Button, Card, Figure, Modal } from "react-bootstrap";
import smilingFace from "../../assets/smiling_face.png";
import frowningFace from "../../assets/frowning_face.png";
import borderDashed from "../../assets/border_dashed.png";
import borderSolid from "../../assets/border_solid.png";
import logo from "../../assets/logo.png";
import backendConfig from '../../config/backend.config.json';
import { CriterionVisitor } from "../../models/business_logic/visitors/criterion_visitors/criterion_return_type_visitor.model";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { FloatCriterion } from "../../models/business_logic/float_criterion.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { useEffect, useState } from "react";
import { Criterion } from "../../models/business_logic/criterion.model";
import { useLocation, useNavigate } from "react-router-dom";
import { CriteriaService } from "../../services/criteria.service";
import { UsersService } from "../../services/users.service";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { Client } from "../../models/business_logic/client.model";
import { DocumentCriterion } from "../../models/business_logic/document_criterion.model";

const ViewCriterionPage = () => {
    const [criterion, setCriterion] = useState<Criterion>(new NumericCriterion(1, 1, "Dummy", 1, 3, 3, 1));
    const [isAlreadyDeleted, setIsAlreadyDeleted] = useState(false);
    const [criterionName, setCriterionName] = useState("");
    const [showDeleteCriterionModal, setShowDeleteCriterionModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState("");
    const [userId, setUserId] = useState(0);
    const [client, setClient] = useState<Client>({id: 0, userId: 0, name: "Dummy", city: "Dummy", street: "Dummy", postalCode: "Dummy"} as Client);
    const location = useLocation();
    const navigate = useNavigate();
    const criterionContentVisitor = new GetCriterionViewerContentVisitor();
    const criterionTypeVisitor = new GetCriterionNameVisitor();
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
            let criterion = getCriterionFromNavigationObject(location.state["criterion"], location.state["type"]);
            setClient(location.state["client"]);
            setCriterion(criterion);
            setCriterionName(criterion.criterionName);
        }).catch((error) => {
            console.log(error);
            navigate("/login");
            return;
        })
    }, []);

    const getCriterionFromNavigationObject  = (navigationObject: any, criterion: any) : Criterion => {
        if (criterion == "numeric"){
            return new NumericCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"]);
        }

        if (criterion == "float"){
            return new FloatCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"]);
        }

        if (criterion == "comment"){
            return new CommentCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"]);
        }

        if (criterion == "text"){
            return new TextValueCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"],
                navigationObject["intToValueMappings"])
        }

        if (criterion == "document"){
            return  new DocumentCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"]);
        }

        throw new Error("Invalid identifier detected!");
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

    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleYourCompaniesClick = () => {
        navigate("/yourcompanies");
    }

    const handleDeleteCriterionClick = () => {
        if (isAlreadyDeleted){
            setInfoModalMessage("The entry was already deleted!");
            setShowInfoModal(true);
            return;
        }

        setShowDeleteCriterionModal(true);
    }

    const handleConfirmDeleteCriterionClick = async() => {
        setShowDeleteCriterionModal(false);
        criteriaService.deleteCriterionById(criterion.id)
        .then((response) => {
            setIsAlreadyDeleted(true);
            setCriterionName(criterionName + " (non-existent)")
            setInfoModalMessage("The criterion was successfully deleted!");
            setShowInfoModal(true);
        })
        .catch((error) => {
            setInfoModalMessage("Some error occurred while deleting the criterion!");
            setShowInfoModal(true);
        })
    }

    return (
        <div id="vctp-view-criterion-container">
            <div id="vctp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>{client.name}</h3>
                <h3>{criterion.acceptVisitor(criterionTypeVisitor)}</h3>
                {userId == client.userId ? 
                    <h3>{criterionName} (your criterion)</h3>
                    :
                    <h3>{criterionName}</h3>
                }
            </div>
            <Card id="vctp-viewer-card">
                <Card.Body>
                        <Card.Title>{criterionName}</Card.Title>
                        <div id="vctp-view-criterion-content-container">
                            {criterion.acceptVisitor(criterionContentVisitor)}
                        </div>
                </Card.Body>
                <div id="vctp-viewer-card-button-panel">
                        <Button className="vctp-viewer-card-button-panel-button" variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
                        {userId == client.userId ?
                        <Button className="vctp-viewer-card-button-panel-button" variant="danger" onClick={() => handleDeleteCriterionClick()}>Delete</Button>
                        : null}
                </div>
            </Card>
            <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                          onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
            <Modal id="vctp-delete-criterion-modal" show={showDeleteCriterionModal} onHide={() => setShowDeleteCriterionModal(false)}>
                <Modal.Header closeButton>
                        <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the criterion? (This cannot be undone!)</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDeleteCriterionModal(false)}>
                        No
                    </Button>
                    <Button variant="secondary" onClick={() => handleConfirmDeleteCriterionClick()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal id="vctp-info-modal" show={showInfoModal} onHide={() => setShowInfoModal(false)}>
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
};

export class GetCriterionNameVisitor implements CriterionVisitor<string>{
    visitDocumentCriterion(criterion: DocumentCriterion): string {
        return "Document-based criterion";
    }
    visitNumberRangeCriterion(criterion: NumericCriterion): string {
        return "Numeric criterion";
    }

    visitFloatRangeCriterion(criterion: FloatCriterion): string {
        return "Continuous criterion";
    }
    visitCommentCriterion(criterion: CommentCriterion): string {
        return "Comment criterion";
    }
    visitTextValueCriterion(criterion: TextValueCriterion): string {
        return "Text-based criterion";
    }
}

export class GetCriterionViewerContentVisitor implements CriterionVisitor<JSX.Element>{
    visitNumberRangeCriterion(criterion: NumericCriterion): JSX.Element {
        return (
            <div id="vctp-number-range-criterion-container">
                <div className="vctp-number-range-criterion-container-member">
                    <div className="vctp-smiley-number-container">
                        {criterion.minValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }
                        <h2>{criterion.minValue}</h2>
                    </div>
                </div>
                <div className="vctp-number-range-criterion-container-member">
                    <Figure>
                        <Figure.Image
                            width={250}
                            height={20}
                            src={borderDashed}
                            alt="border_dashed"
                        />
                    </Figure>
                </div>
                <div className="vctp-number-range-criterion-container-member">
                    <div className="vctp-smiley-number-container">
                        {criterion.maxValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }
                        <h2>{criterion.maxValue}</h2>
                        </div>
                </div>
            </div>
        );
    }

    visitFloatRangeCriterion(criterion: FloatCriterion): JSX.Element {
        return (
            <div id="vctp-float-range-criterion-container">
                <div className="vctp-float-range-criterion-container-member">
                    <div className="vctp-smiley-number-container">
                        {criterion.minValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }
                        <h2>{criterion.minValue}</h2>
                    </div>
                </div>
                <div className="vctp-float-range-criterion-container-member">
                    <Figure>
                        <Figure.Image
                            width={250}
                            height={20}
                            src={borderSolid}
                            alt="border_dashed"
                        />
                    </Figure>
                </div>
                <div className="vctp-float-range-criterion-container-member">
                    <div className="vctp-smiley-number-container">
                        {criterion.maxValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={100}
                                    height={100}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }
                        <h2>{criterion.maxValue}</h2>
                        </div>
                </div>
            </div>
        );
    }

    visitCommentCriterion(criterion: CommentCriterion): JSX.Element {
        return (
            <div id="vctp-comment-criterion-container">
                <div className="vctp-comment-criterion-container-member">
                    <h4>This is a normal comment criterion</h4>
                </div>
            </div>
        );
    }

    visitDocumentCriterion(criterion: DocumentCriterion): JSX.Element {
        return (
            <div id="vctp-document-criterion-container">
                <div className="vctp-document-criterion-container-member">
                    <h4>This is a normal document-based criterion</h4>
                </div>
            </div>
        );
    }
    
    visitTextValueCriterion(criterion: TextValueCriterion): JSX.Element {
        let mappingsSorted = criterion.intToValueMappings.sort((a, b) => a.int < b.int ? -1 : a.int > b.int ? 1 : 0);

        return (
            <>
                {mappingsSorted.length >= 2 ? 
                <div id="vctp-text-value-criterion-container">
                    <div className="vctp-text-value-criterion-container-member">
                        <h3>{mappingsSorted[0].value}</h3>
                        <div className="vctp-member-div">
                        {criterion.minValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }    
                        </div>
                    </div>
                    {mappingsSorted.length > 2 ? 
                        mappingsSorted.slice(1, mappingsSorted.length - 1).map(c  => (
                            <div className="vctp-text-value-criterion-container-member">
                                <h3>{c.value}</h3>
                                <div className="vctp-member-div">

                                </div>
                            </div>
                        ))
                      : null
                    }
                    <div className="vctp-text-value-criterion-container-member">
                        <h3>{mappingsSorted[mappingsSorted.length - 1].value}</h3>
                        <div className="vctp-member-div">
                        {criterion.maxValue == criterion.worstValue ? 
                            <Figure>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    src={frowningFace}
                                    alt="frowning_face"
                                />
                            </Figure>
                            :
                            <Figure>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    src={smilingFace}
                                    alt="smiling_face"
                                />
                            </Figure>
                        }
                        </div>
                    </div>
                </div>
                : null
            }
            </>
        );
    }

}

export default ViewCriterionPage;