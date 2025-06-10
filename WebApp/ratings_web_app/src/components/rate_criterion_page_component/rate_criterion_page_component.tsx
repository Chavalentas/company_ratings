import { Button, Card, Figure, Form, Modal } from "react-bootstrap";
import logo from "../../assets/logo.png";
import backendConfig from "../../config/backend.config.json";
import "./rate_criterion_page_component.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Client } from "../../models/business_logic/client.model";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";
import { FloatCriterion } from "../../models/business_logic/float_criterion.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { UsersService } from "../../services/users.service";
import { RatingsService } from "../../services/ratings.service";
import { NumericRating } from "../../models/business_logic/numeric_rating.model";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { FloatRating } from "../../models/business_logic/float_rating.model";
import { TextCriterionIntValue } from "../../models/business_logic/text_criterion_int_value.model";
import RateNumericCriterionCard from "./rate_numeric_criterion_card_component/rate_numeric_criterion_card_component";
import { CommentRating } from "../../models/business_logic/comment_rating.model";
import { TextValueRating } from "../../models/business_logic/text_value_rating.model";
import RateFloatCriterionCard from "./rate_float_criterion_card_component/rate_float_criterion_card_component";
import RateCommentCriterionCard from "./rate_comment_criterion_card_component/rate_comment_criterion_card_component";
import RateTextCriterionCard from "./rate_text_criterion_card_component/rate_text_criterion_card_component";
import { AddRatingCardContentProps } from "../../props/add_rating_card_content.props";
import { DocumentCriterion } from "../../models/business_logic/document_criterion.model";
import RateDocumentCriterionCard from "./rate_document_criterion_card_component/rate_document_criterion_card_component";
import { DocumentRating } from "../../models/business_logic/document_rating.model";
import {Buffer} from 'buffer';

const RateCriterionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [criterionType, setCriterionType] = useState(location.state["type"]);
    const [currentClient, setCurrentClient] = useState<Client>(location.state["client"] as Client);
    const [currentFloatCriterion, setCurrentFloatCriterion] = useState<FloatCriterion>(new FloatCriterion(0, 0, "Dummy", 1, 10, 1, 10));   
    const [currentNumericCriterion, setCurrentNumericCriterion] = useState<NumericCriterion>(new NumericCriterion(0, 0, "Dummy", 1, 10, 1, 10));   
    const [currentCommentCriterion, setCurrentCommentCriterion] = useState<CommentCriterion>(new CommentCriterion(0, 0, "Dummy"));
    const [currentDocumentCriterion, setCurrentDocumentCriterion] = useState<DocumentCriterion>(new DocumentCriterion(0, 0, "Dummy"));
    const [currentTextCriterion, setCurrentTextCriterion] = useState<TextValueCriterion>(new TextValueCriterion(0, 0, "Dummy", 1, 3, 1, 3,
        [{value: "a", int: 1} as TextCriterionIntValue, {value: "b", int: 2} as  TextCriterionIntValue, {value: "c", int: 3}]));
    const [documentSpinnerVisible, setDocumentSpinnerVisible] = useState(false);
    const [userId, setUserId] = useState(0);
    const usersService = new UsersService(backendConfig.host + "/users");
    const ratingsService = new RatingsService(backendConfig.host + "/ratings");

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token === null || token === ""){
            navigate("/login");
            return;
        }

        usersService.verifyUser(token).then((response) => {
          setCurrentClient(location.state["client"]);
          setCriterionType(location.state["type"]);
          setCriterionFromNavigationObject(location.state["criterion"], location.state["type"]);
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

    const handleAddNumericRatingClick = async(rating: NumericRating) => {
        rating.userId = userId;
        ratingsService.registerNumericRating(rating)
        .then((response) => {
            setModalMessage("The rating was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be registered! Try again later!");
            setShowModal(true);
        })
    }

    const handleAddFloatRatingClick = async(rating: FloatRating) => {
        rating.userId = userId;
        ratingsService.registerFloatRating(rating)
        .then((response) => {
            setModalMessage("The rating was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be registered! Try again later!");
            setShowModal(true);
        })   
    }
    
    const handleAddCommentRatingClick = async(rating: CommentRating) => {
        rating.userId = userId;
        ratingsService.registerCommentRating(rating)
        .then((response) => {
            setModalMessage("The rating was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be registered! Try again later!");
            setShowModal(true);
        })
    }
    
    const handleAddTextValueRatingClick = async(rating: TextValueRating) => {
        rating.userId = userId;
        ratingsService.registerTextValueRating(rating)
        .then((response) => {
            setModalMessage("The rating was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be registered! Try again later!");
            setShowModal(true);
        })
    }

    const handleAddDocumentRatingClick = async(rating: DocumentRating) => {
        setDocumentSpinnerVisible(true),
        rating.userId = userId;
        ratingsService.registerDocumentRating(rating)
        .then((response) => {
            setModalMessage("The rating was successfully registered!");
            setShowModal(true);
        })
        .catch((error) => {
            setModalMessage("The rating could not be registered! Try again later!");
            setShowModal(true);
        })  
        .finally(() => {
            setDocumentSpinnerVisible(false);
        })
    }

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    const setCriterionFromNavigationObject  = (navigationObject: any, criterion: any) : void => {
        if (criterion == "numeric"){
            setCurrentNumericCriterion(new NumericCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"]));
            return;
        }

        if (criterion == "float"){
            setCurrentFloatCriterion(new FloatCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"]));
            return;
        }

        if (criterion == "comment"){
            setCurrentCommentCriterion(new CommentCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"]));
            return;
        }

        if (criterion == "text"){
            setCurrentTextCriterion(new TextValueCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"],
                navigationObject["minValue"], navigationObject["maxValue"], navigationObject["worstValue"], navigationObject["bestValue"],
                navigationObject["intToValueMappings"]));
            return;
        }

        if (criterion == "document"){
            setCurrentDocumentCriterion(new DocumentCriterion(navigationObject["id"], navigationObject["clientId"], navigationObject["criterionName"]));
            return;
        }

        throw new Error("Invalid identifier detected!");
    }
    
    return(
        <div id="rcp-rate-criterion-container">
            <div id="rcp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                <h3>{currentClient.name}</h3>
                <CriterionPageCardContent isSpinning={documentSpinnerVisible} documentCriterion={currentDocumentCriterion} numericCriterion={currentNumericCriterion} floatCriterion={currentFloatCriterion}
                commentCriterion={currentCommentCriterion} textValueCriterion={currentTextCriterion} criterionType={criterionType}
                onBackButtonClick={() => handleBackButtonClick()} onSubmitNumericRatingClick={(rating) => handleAddNumericRatingClick(rating)}
                onSubmitFloatRatingClick={(rating) => handleAddFloatRatingClick(rating)} onSubmitCommentRatingClick={(rating) => handleAddCommentRatingClick(rating)}
                onSubmitTextValueRatingClick={(rating) => handleAddTextValueRatingClick(rating)} onSubmitDocumentRatingClick={(rating) => handleAddDocumentRatingClick(rating)}/>
                <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                         onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
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
            </div> 
        </div>
    );
};

const CriterionPageCardContent = (props: AddRatingCardContentProps) => {
    const [numericCriterion, setNumericCriterion] = useState<NumericCriterion>(props.numericCriterion);
    const [floatCriterion, setFloatCriterion] = useState<FloatCriterion>(props.floatCriterion);
    const [commentCriterion, setCommentCriterion] = useState<CommentCriterion>(props.commentCriterion);
    const [textValueCriterion, setTextValueCriterion] = useState<TextValueCriterion>(props.textValueCriterion);
    const [documentCriterion, setDocumentCriterion] = useState<DocumentCriterion>(props.documentCriterion);
    const [criterionType, setCriterionType] = useState<string>(props.criterionType);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState<boolean>(props.isSpinning);

    useEffect(() => {
        setCriterionType(props.criterionType);
        setNumericCriterion(props.numericCriterion);
        setFloatCriterion(props.floatCriterion);
        setCommentCriterion(props.commentCriterion);
        setTextValueCriterion(props.textValueCriterion);
        setDocumentCriterion(props.documentCriterion);
        setIsSpinnerVisible(props.isSpinning);
    }, [props]);

    if (criterionType == "numeric"){
        return <RateNumericCriterionCard criterion={numericCriterion} onSubmitClick={(rating: NumericRating) => props.onSubmitNumericRatingClick(rating)}
        onBackButtonClick={() => props.onBackButtonClick()}/>
    }

    if (criterionType == "float"){
        return <RateFloatCriterionCard criterion={floatCriterion} onSubmitClick={(rating: FloatRating) => props.onSubmitFloatRatingClick(rating)}
        onBackButtonClick={() => props.onBackButtonClick()}/>
    }

    if (criterionType == "comment"){
        return <RateCommentCriterionCard criterion={commentCriterion} onSubmitClick={(rating: CommentRating) => props.onSubmitCommentRatingClick(rating)}
        onBackButtonClick={() => props.onBackButtonClick()}/>
    }

    if (criterionType == "text"){
        return <RateTextCriterionCard criterion={textValueCriterion} onSubmitClick={(rating: TextValueRating) => props.onSubmitTextValueRatingClick(rating)}
        onBackButtonClick={() => props.onBackButtonClick()}/>
    }

    if (criterionType == "document"){
        return <RateDocumentCriterionCard criterion={documentCriterion} onSubmitClick={(rating: DocumentRating) => props.onSubmitDocumentRatingClick(rating)}
        onBackButtonClick={() => props.onBackButtonClick()} isSpinning={isSpinnerVisible}/> 
    }
}

export default RateCriterionPage;