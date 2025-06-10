import "./view_ratings_page_component.css";
import backendConfig from "../../config/backend.config.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FloatCriterion } from "../../models/business_logic/float_criterion.model";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";
import { Client } from "../../models/business_logic/client.model";
import { TextCriterionIntValue } from "../../models/business_logic/text_criterion_int_value.model";
import { UsersService } from "../../services/users.service";
import { RatingsService } from "../../services/ratings.service";
import { Button, Figure, Modal } from "react-bootstrap";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { ViewRatingsContentProps } from "../../props/view_ratings_content.props";
import { Criterion } from "../../models/business_logic/criterion.model";
import { Rating } from "../../models/business_logic/rating.model";
import { IdentifyCriterionVisitor } from "../../models/business_logic/visitors/criterion_visitors/identifiy_criterion_visitor.model";
import { NumericRating } from "../../models/business_logic/numeric_rating.model";
import ViewNumericRatingsContent from "./view_numeric_ratings_content_component/view_numeric_ratings_content_component";
import ViewFloatRatingsContent from "./view_float_ratings_content_component/view_float_ratings_content_component";
import ViewCommentRatingsContent from "./view_comment_ratings_content_component/view_comment_ratings_content_component";
import ViewTextRatingsContent from "./view_text_ratings_content_component/view_text_ratings_content_component";
import { DocumentCriterion } from "../../models/business_logic/document_criterion.model";
import ViewDocumentRatingsContent from "./view_document_ratings_content_component/view_document_ratings_content_component";

const ViewRatingsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ratingToDelete, setRatingToDelete] = useState<Rating>(new NumericRating(0, 0, 0, new Date(), 1));
    const [criterionType, setCriterionType] = useState(location.state["type"]);
    const [currentClient, setCurrentClient] = useState<Client>(location.state["client"] as Client);
    const [currentFloatCriterion, setCurrentFloatCriterion] = useState<FloatCriterion>(new FloatCriterion(0, 0, "Dummy", 1, 10, 1, 10));   
    const [currentNumericCriterion, setCurrentNumericCriterion] = useState<NumericCriterion>(new NumericCriterion(0, 0, "Dummy", 1, 10, 1, 10));   
    const [currentCommentCriterion, setCurrentCommentCriterion] = useState<CommentCriterion>(new CommentCriterion(0, 0, "Dummy"));
    const [currentTextCriterion, setCurrentTextCriterion] = useState<TextValueCriterion>(new TextValueCriterion(0, 0, "Dummy", 1, 3, 1, 3,
        [{value: "a", int: 1} as TextCriterionIntValue, {value: "b", int: 2} as  TextCriterionIntValue, {value: "c", int: 3}]));
    const [currentDocumentCriterion, setCurrentDocumentCriterion] = useState<DocumentCriterion>(new DocumentCriterion(0, 0, "Dummy"));
    const [userId, setUserId] = useState(0);
    const usersService = new UsersService(backendConfig.host + "/users");
    const ratingsService = new RatingsService(backendConfig.host + "/ratings");
    const identifyCriteriaVisitor = new IdentifyCriterionVisitor();

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

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    const handleRateCriterionClick = (criterion: Criterion) => {
        navigate('/rate', { state: {criterion: criterion, client: currentClient, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
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
        <div id="vrp-rate-criterion-container">
            <div id="vrp-welcome-panel">
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
                <ViewRatingsPageContent client={currentClient} criterionType={criterionType} floatCriterion={currentFloatCriterion} numericCriterion={currentNumericCriterion}
                   commentCriterion={currentCommentCriterion} documentCriterion={currentDocumentCriterion} textValueCriterion={currentTextCriterion} onBackButtonClick={() => handleBackButtonClick()} onRateCriterionClick={(criterion) => handleRateCriterionClick(criterion)}/>
                <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                         onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
            </div> 
        </div>
    );
};

const ViewRatingsPageContent = (props: ViewRatingsContentProps) => {
    const [numericCriterion, setNumericCriterion] = useState<NumericCriterion>(props.numericCriterion);
    const [floatCriterion, setFloatCriterion] = useState<FloatCriterion>(props.floatCriterion);
    const [commentCriterion, setCommentCriterion] = useState<CommentCriterion>(props.commentCriterion);
    const [textValueCriterion, setTextValueCriterion] = useState<TextValueCriterion>(props.textValueCriterion);
    const [documentCriterion, setDocumentCriterion] = useState<DocumentCriterion>(props.documentCriterion);
    const [criterionType, setCriterionType] = useState<string>(props.criterionType);
    const [currentClient, setCurrentClient] = useState<Client>(props.client);

    useEffect(() => {
        setCriterionType(props.criterionType);
        setNumericCriterion(props.numericCriterion);
        setFloatCriterion(props.floatCriterion);
        setCommentCriterion(props.commentCriterion);
        setTextValueCriterion(props.textValueCriterion);
        setDocumentCriterion(props.documentCriterion);
        setCurrentClient(props.client);
    }, [props]);

    if (criterionType == "numeric"){
        return <ViewNumericRatingsContent client={currentClient} criterion={numericCriterion} onBackButton={() => props.onBackButtonClick()}
        onRateCriterion={(criterion) => props.onRateCriterionClick(criterion)}/>
    }

    if (criterionType == "float"){
        return <ViewFloatRatingsContent client={currentClient} criterion={floatCriterion} onBackButton={() => props.onBackButtonClick()}
        onRateCriterion={(criterion) => props.onRateCriterionClick(criterion)}/>
    }

    if (criterionType == "comment"){
        return <ViewCommentRatingsContent client={currentClient} criterion={commentCriterion} onBackButton={() => props.onBackButtonClick()}
        onRateCriterion={(criterion) => props.onRateCriterionClick(criterion)}/>
    }

    if (criterionType == "text"){
        return <ViewTextRatingsContent client={currentClient} criterion={textValueCriterion} onBackButton={() => props.onBackButtonClick()}
        onRateCriterion={(criterion) => props.onRateCriterionClick(criterion)}/>
    }

    if (criterionType == "document"){
        return <ViewDocumentRatingsContent client={currentClient} criterion={documentCriterion} onBackButton={() => props.onBackButtonClick()}
        onRateCriterion={(criterion) => props.onRateCriterionClick(criterion)}/>
    }
}

export default ViewRatingsPage;