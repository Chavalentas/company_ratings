import { useNavigate } from "react-router-dom";
import backendConfig from '../../config/backend.config.json';
import "./users_company_criteria_page_component.css";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { UsersService } from "../../services/users.service";
import { CriteriaService } from "../../services/criteria.service";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { FloatCriterion } from "../../models/business_logic/float_criterion.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { Button, Card, Figure, ListGroup, Modal } from "react-bootstrap";
import { Criterion } from "../../models/business_logic/criterion.model";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { useLocation } from 'react-router-dom';
import { Client } from "../../models/business_logic/client.model";
import { LoadedSeparatedCriteria } from "../../models/business_logic/loaded_separate_criteria.model";
import { IdentifyCriterionVisitor } from "../../models/business_logic/visitors/criterion_visitors/identifiy_criterion_visitor.model";
import { Helper } from "../../models/business_logic/helper.model";
import { DocumentCriterion } from "../../models/business_logic/document_criterion.model";

const UsersCompanyCriteriaPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(0);
    const [numericCriteria, setNumericCriteria] = useState<NumericCriterion[]>([]);
    const [floatCriteria, setFloatCriteria] = useState<FloatCriterion[]>([]);
    const [commentCriteria, setCommentCriteria] = useState<CommentCriterion[]>([]);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoModalMessage, setInfoModalMessage] = useState("");
    const [criterionToDelete, setCriterionToDelete] = useState<Criterion>(new NumericCriterion(0, 0, "Dummy", 1, 3, 1, 3));
    const [textValueCriteria, setTextValueCriteria] = useState<TextValueCriterion[]>([]);
    const [documentCriteria, setDocumentCriteria] = useState<DocumentCriterion[]>([]);
    const [showDeleteCriterionModal, setShowDeleteCriterionModal] = useState(false);
    const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);
    const [criteriaIdentifier, setCriteriaIdentifier] = useState("all");
    const [client, setClient] = useState<Client>({} as Client);
    const usersService = new UsersService(backendConfig.host + "/users");
    const criteriaService = new CriteriaService(backendConfig.host + "/criteria");
    const identifyCriteriaVisitor = new IdentifyCriterionVisitor();

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
            setUserId(response.userId);
            let client = location.state as Client;
            setClient(client);
            loadCriteria(client.id).then((loadedCriteria) => {
                let numericCriteriaSorted =  sortNumericByName(loadedCriteria.numericCriteria);
                setNumericCriteria(numericCriteriaSorted);
                let floatCriteriaSorted =  sortFloatByName(loadedCriteria.floatCriteria);
                setFloatCriteria(floatCriteriaSorted);
                let commentCriteriaSorted = sortCommentByName(loadedCriteria.commentCriteria);
                setCommentCriteria(commentCriteriaSorted);
                let textValueCriteriaSorted = sortTextValueByName(loadedCriteria.textValueCriteria);
                setTextValueCriteria(textValueCriteriaSorted);
                let documentSorted = sortDocumentByName(loadedCriteria.documentCriteria);
                setDocumentCriteria(documentSorted);
            }).catch((error) => {
                console.log(error)
                navigate("/login");
                return;
            })
        }).catch((error) => {
            console.log(error);
            navigate("/login");
            return;
        })
    }, []);

    const loadCriteria = async(clientId: number) => {
        let numericCriteriaTask = criteriaService.getNumberRangeCriteriaByClientId(clientId);
        let floatCriteriaTask = criteriaService.getFloatRangeCriteriaByClientId(clientId);
        let commentCriteriaTask = criteriaService.getCommentCriteriaByClientId(clientId);
        let textValueCriteriaTask = criteriaService.getTextValueCriteriaByClientId(clientId);
        let documentCriteriaTask = criteriaService.getDocumentCriteriaByClientId(clientId);
        let numericCriteria = await numericCriteriaTask;
        let numericCriteriaList: Criterion[] = numericCriteria.result.map(c => new NumericCriterion(c.id, c.clientId, c.criterionName,
            c.minValue, c.maxValue, c.worstValue, c.bestValue));
        let floatCriteria = await floatCriteriaTask;
        let floatCriteriaList: Criterion[] = floatCriteria.result.map(c => new FloatCriterion(c.id, c.clientId, c.criterionName,
            c.minValue, c.maxValue, c.worstValue, c.bestValue));
        let commentCriteria = await commentCriteriaTask;
        let commentCriteriaList: Criterion[] = commentCriteria.result.map(c => new CommentCriterion(c.id, c.clientId, c.criterionName));
        let textValueCriteria = await textValueCriteriaTask;
        let textValueCriteriaList: Criterion[] = textValueCriteria.result.map(c => new TextValueCriterion(c.id, c.clientId, c.criterionName,
            c.minValue, c.maxValue, c.worstValue, c.bestValue, c.intToValueMappings));
        let documentCriteria = await documentCriteriaTask;
        let documentCriteriaList: Criterion[] = documentCriteria.result.map(c => new DocumentCriterion(c.id, c.clientId, c.criterionName));
        return {numericCriteria: numericCriteriaList, floatCriteria: floatCriteriaList, commentCriteria: commentCriteriaList, textValueCriteria: textValueCriteriaList, documentCriteria: documentCriteriaList} as LoadedSeparatedCriteria;
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

    const handleViewCriterionClick = (criterion: Criterion) => {
        navigate('/viewcriterion', { state: {criterion: criterion, client: client, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
    };

    const handleViewRatingsClick = (criterion: Criterion) => {
        navigate('/viewratings', { state: {criterion: criterion, client: client, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
    };

    const handleDeleteCriterionClick = (criterion: Criterion, criterionIdentifier: string) => {
        setCriterionToDelete(criterion);
        setCriteriaIdentifier(criterionIdentifier);
        setShowDeleteCriterionModal(true);
    };

    const handleConfirmDeleteCriterionClick = () => {
        setShowDeleteCriterionModal(false);

        criteriaService.deleteCriterionById(criterionToDelete.id)
        .then((response) => {
            if (criteriaIdentifier == "numeric"){
                let newNumeric = numericCriteria.filter(c => c.id != criterionToDelete.id);
                newNumeric = sortNumericByName(newNumeric);
                setNumericCriteria(newNumeric);
            }

            if (criteriaIdentifier == "float"){
                let newFloat = floatCriteria.filter(c => c.id != criterionToDelete.id);
                newFloat = sortFloatByName(newFloat);
                setFloatCriteria(newFloat);
            }

            if (criteriaIdentifier == "comment"){
                let newComment = commentCriteria.filter(c => c.id != criterionToDelete.id);
                newComment = sortCommentByName(newComment);
                setCommentCriteria(newComment);
            }

            if (criteriaIdentifier == "text"){
                let newTextValue = textValueCriteria.filter(c => c.id != criterionToDelete.id);
                newTextValue = sortTextValueByName(newTextValue);
                setTextValueCriteria(newTextValue);
            }

            if (criteriaIdentifier == "document"){
                let newDocument = documentCriteria.filter(c => c.id != criterionToDelete.id);
                newDocument = sortDocumentByName(newDocument);
                setDocumentCriteria(newDocument);
            }

            setInfoModalMessage("The criterion was successfully deleted!");
            setShowInfoModal(true);
        })
        .catch((error) => {
            setInfoModalMessage("Some error occurred while deleting the criterion!");
            setShowInfoModal(true);
        })
    }

    const handleAddNewNumericCriterionClick = () => {
        navigate('/newnumeric', { state: client});
    };
    
    const handleAddNewFloatCriterionClick = () => {
        navigate('/newfloat', { state: client});
    };

    
    const handleAddNewTextValueCriterionClick = () => {
        navigate('/newtext', { state: client});
    };

    
    const handleAddNewCommentCriterionClick = () => {
        navigate("/newcomment", {state: client});
    };

    const handleAddNewDocumentCriterionClick = () => {
        navigate("/newdocument", {state: client});
    }

    const handleDeleteCriteriaClick = (indicator: string) => {
        setCriteriaIdentifier(indicator);
        setShowDeleteCriteriaModal(true);
    }

    const handleConfirmDeleteCriteriaClick = () => {
        setShowDeleteCriteriaModal(false);

        if (criteriaIdentifier == "all"){
            criteriaService.deleteCriteriaByClientId(client.id)
            .then((response) => {
                setNumericCriteria([]);
                setFloatCriteria([]);
                setCommentCriteria([]);
                setTextValueCriteria([]);
                setDocumentCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }

        if (criteriaIdentifier == "numeric"){
            criteriaService.deleteNumberCriteriaByClientId(client.id)
            .then((response) => {
                setNumericCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }

        if (criteriaIdentifier == "float"){
            criteriaService.deleteFloatCriteriaByClientId(client.id)
            .then((response) => {
                setFloatCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }

        if (criteriaIdentifier == "text"){
            criteriaService.deleteTextValueCriteriaByClientId(client.id)
            .then((response) => {
                setTextValueCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }

        if (criteriaIdentifier == "comment"){
            criteriaService.deleteCommentCriteriaByClientId(client.id)
            .then((response) => {
                setCommentCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }

        if (criteriaIdentifier == "document"){
            criteriaService.deleteDocumentCriteriaByClientId(client.id)
            .then((response) => {
                setDocumentCriteria([]);
                setInfoModalMessage("The criteria were successfully deleted!");
                setShowInfoModal(true);
            })
            .catch((error) => {
                setInfoModalMessage("Some error occurred while deleting the criteria!");
                setShowInfoModal(true);
            })
            return;
        }
    }

    const sortNumericByName = (criteria: NumericCriterion[]) : NumericCriterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);
    }

    const sortDocumentByName = (criteria: DocumentCriterion[]) : DocumentCriterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);
    }

    const sortFloatByName = (criteria: FloatCriterion[]) : FloatCriterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);
    }

    const sortCommentByName = (criteria: CommentCriterion[]) : CommentCriterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);
    }

    const sortTextValueByName = (criteria: TextValueCriterion[]) : TextValueCriterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);
    }
    
    return(
    <div id="uccp-users-company-criteria-container">
            <div id="uccp-welcome-panel">
                <h1 className="uccp-page-heading">WELCOME TO</h1>
                <Figure className="uccp-page-heading">
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3 className="uccp-page-heading">Your companies</h3>
                <h3 className="uccp-page-heading">{client.name}</h3>
            </div>
            <div id="uccp-criteria-container">
            <Card className="uccp-criteria-card">
                    <Card.Body>
                            <Card.Title>Comment criteria</Card.Title>
                            <div className="uccp-criteria-list">
                                <ListGroup>
                                            {commentCriteria.length > 0 ? commentCriteria.map(criterion => (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                                                <div className="uccp-item-container">
                                                    <div className="uccp-item-member-name-panel">
                                                    <span className="uccp-item-member">{criterion.criterionName}</span>
                                                </div>
                                                    <div className="uccp-item-member-button-panel">
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                                        <Button className="uccp-item-member" variant="danger" onClick={() => handleDeleteCriterionClick(criterion, "comment")}>Delete</Button>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        )): 
                                        <div className="uccp-no-criteria-heading">
                                            <h3>No criteria available!</h3>
                                        </div>}                            
                                </ListGroup>
                            </div>
                    </Card.Body>
                    <div className="uccp-criteria-button-panel">
                                <Button className="uccp-criteria-button-panel-button" variant="dark" onClick={() => handleAddNewCommentCriterionClick()}>New criterion</Button>
                                <Button className="uccp-criteria-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("comment")}>Delete all</Button>
                    </div>
                </Card>
                <Card className="uccp-criteria-card">
                    <Card.Body>
                            <Card.Title>Continuous criteria</Card.Title>
                            <div className="uccp-criteria-list">
                                <ListGroup>
                                            {floatCriteria.length > 0 ? floatCriteria.map(criterion => (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                                                <div className="uccp-item-container">
                                                    <div className="uccp-item-member-name-panel">
                                                    <span className="uccp-item-member">{criterion.criterionName}</span>
                                                </div>
                                                    <div className="uccp-item-member-button-panel">
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                                        <Button className="uccp-item-member" variant="danger" onClick={() => handleDeleteCriterionClick(criterion, "float")}>Delete</Button>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        )): 
                                        <div className="uccp-no-criteria-heading">
                                            <h3>No criteria available!</h3>
                                        </div>}                             
                                </ListGroup>
                            </div>
                    </Card.Body>
                    <div className="uccp-criteria-button-panel">
                                <Button className="uccp-criteria-button-panel-button" variant="dark" onClick={() => handleAddNewFloatCriterionClick()}>New criterion</Button>
                                <Button className="uccp-criteria-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("float")}>Delete all</Button>
                    </div>
                </Card>
                <Card className="uccp-criteria-card">
                    <Card.Body>
                            <Card.Title>Document-based criteria</Card.Title>
                            <div className="uccp-criteria-list">
                                <ListGroup>
                                            {documentCriteria.length > 0 ? documentCriteria.map(criterion => (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                                                <div className="uccp-item-container">
                                                    <div className="uccp-item-member-name-panel">
                                                    <span className="uccp-item-member">{criterion.criterionName}</span>
                                                </div>
                                                    <div className="uccp-item-member-button-panel">
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                                        <Button className="uccp-item-member" variant="danger" onClick={() => handleDeleteCriterionClick(criterion, "document")}>Delete</Button>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        )): 
                                        <div className="uccp-no-criteria-heading">
                                            <h3>No criteria available!</h3>
                                        </div>}                             
                                </ListGroup>
                            </div>
                    </Card.Body>
                    <div className="uccp-criteria-button-panel">
                                <Button className="uccp-criteria-button-panel-button" variant="dark" onClick={() => handleAddNewDocumentCriterionClick()}>New criterion</Button>
                                <Button className="uccp-criteria-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("document")}>Delete all</Button>
                    </div>
                </Card>
                <Card className="uccp-criteria-card">
                    <Card.Body>
                            <Card.Title>Numeric criteria</Card.Title>
                            <div className="uccp-criteria-list">
                                <ListGroup>
                                            {numericCriteria.length > 0 ? numericCriteria.map(criterion => (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                                                <div className="uccp-item-container">
                                                    <div className="uccp-item-member-name-panel">
                                                    <span className="uccp-item-member">{criterion.criterionName}</span>
                                                </div>
                                                    <div className="uccp-item-member-button-panel">
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                                        <Button className="uccp-item-member" variant="danger" onClick={() => handleDeleteCriterionClick(criterion, "numeric")}>Delete</Button>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        )): 
                                        <div className="uccp-no-criteria-heading">
                                            <h3>No criteria available!</h3>
                                        </div>}                           
                                </ListGroup>
                            </div>
                    </Card.Body>
                    <div className="uccp-criteria-button-panel">
                                <Button className="uccp-criteria-button-panel-button" variant="dark" onClick={() => handleAddNewNumericCriterionClick()}>New criterion</Button>
                                <Button className="uccp-criteria-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("numeric")}>Delete all</Button>
                    </div>
                </Card>
                <Card className="uccp-criteria-card">
                    <Card.Body>
                            <Card.Title>Text-based criteria</Card.Title>
                            <div className="uccp-criteria-list">
                                <ListGroup>
                                            {textValueCriteria.length > 0 ? textValueCriteria.map(criterion => (
                                            <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                                                <div className="uccp-item-container">
                                                    <div className="uccp-item-member-name-panel">
                                                    <span className="uccp-item-member">{criterion.criterionName}</span>
                                                </div>
                                                    <div className="uccp-item-member-button-panel">
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                                        <Button className="uccp-item-member" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                                        <Button className="uccp-item-member" variant="danger" onClick={() => handleDeleteCriterionClick(criterion, "text")}>Delete</Button>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        )): 
                                        <div className="uccp-no-criteria-heading">
                                            <h3>No criteria available!</h3>
                                        </div>}                             
                                </ListGroup>
                            </div>
                    </Card.Body>
                    <div className="uccp-criteria-button-panel">
                                <Button className="uccp-criteria-button-panel-button" variant="dark" onClick={() => handleAddNewTextValueCriterionClick()}>New criterion</Button>
                                <Button className="uccp-criteria-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("text")}>Delete all</Button>
                    </div>
                </Card>
            </div>
                <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                          onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
            <div className="uccp-overall-button-panel">
                <Button className="uccp-overall-button-panel-button" variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
                <Button className="uccp-overall-button-panel-button" variant="danger" onClick={() => handleDeleteCriteriaClick("all")}>Delete all</Button>
            </div>
            <Modal id="info-modal" show={showInfoModal} onHide={() => setShowInfoModal(false)}>
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
            <Modal id="uccp-delete-criterion-modal" show={showDeleteCriterionModal} onHide={() => setShowDeleteCriterionModal(false)}>
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
            <Modal id="uccp-delete-criteria-modal" show={showDeleteCriteriaModal} onHide={() => setShowDeleteCriteriaModal(false)}>
                <Modal.Header closeButton>
                        <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the criteria? (This cannot be undone!)</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDeleteCriteriaModal(false)}>
                        No
                    </Button>
                    <Button variant="secondary" onClick={() => handleConfirmDeleteCriteriaClick()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
    );
};

export default UsersCompanyCriteriaPage;