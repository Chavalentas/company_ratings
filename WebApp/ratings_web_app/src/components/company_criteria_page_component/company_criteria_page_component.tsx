import logo from "../../assets/logo.png";
import backendConfig from '../../config/backend.config.json';
import "./company_criteria_page_component.css";
import { UsersService } from "../../services/users.service";
import { CriteriaService } from "../../services/criteria.service";
import { Criterion } from "../../models/business_logic/criterion.model";
import { useEffect, useState } from "react";
import { Client } from "../../models/business_logic/client.model";
import { CommentCriterion } from "../../models/business_logic/comment_criterion.model";
import { TextValueCriterion } from "../../models/business_logic/text_value_criterion.model";
import { NumericCriterion } from "../../models/business_logic/numeric_criterion.model";
import { FloatCriterion } from "../../models/business_logic/float_criterion.model";
import { Button, Figure, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { IdentifyCriterionVisitor } from "../../models/business_logic/visitors/criterion_visitors/identifiy_criterion_visitor.model";
import Sidebar from "../sidebar_menu_component/sidebar_menu_component";
import { Helper } from "../../models/business_logic/helper.model";
import { DocumentCriterion } from "../../models/business_logic/document_criterion.model";

const CompanyCriteriaPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentClient, setClient] = useState<Client>({id: 0, userId: 0,  name: "Dummy", city: "Dummy", street: "Dummy", postalCode: "Dummy"} as Client);
    const [criteria, setCriteria] = useState<Criterion[]>([]);
    const [userId, setUserId] = useState(0);
    const identifyCriteriaVisitor = new IdentifyCriterionVisitor();
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
            let client = location.state as Client;
            setClient(client);
            getCriteria(client.id).then((loadedCriteria) => {
                let criteria = sortCriteriaByName(loadedCriteria);
                setCriteria(criteria);
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
        navigate('/viewcriterion', { state: {criterion: criterion, client: currentClient, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
    }

    const handleViewRatingsClick = (criterion: Criterion) => {
        navigate('/viewratings', { state: {criterion: criterion, client: currentClient, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
    }

    const handleRateClick = (criterion: Criterion) => {
        navigate('/rate', { state: {criterion: criterion, client: currentClient, type: criterion.acceptVisitor(identifyCriteriaVisitor)} });
    }

    const getCriteria = async(clientId: number): Promise<Criterion[]>  => {
        let id = clientId;
        let commentTask = criteriaService.getCommentCriteriaByClientId(id);
        let textBasedTask = criteriaService.getTextValueCriteriaByClientId(id);
        let numericTask = criteriaService.getNumberRangeCriteriaByClientId(id);
        let floatTask = criteriaService.getFloatRangeCriteriaByClientId(id);
        let documentTask = criteriaService.getDocumentCriteriaByClientId(id);
        let result: Criterion[] = [];
        let comments = await commentTask;
        result = result.concat(comments.result.map(c => (new CommentCriterion(c.id, c.clientId, c.criterionName))));
        let textBaseds = await textBasedTask;
        result = result.concat(textBaseds.result.map(c => (new TextValueCriterion(c.id, c.clientId, c.criterionName, c.minValue, c.maxValue, c.worstValue, c.bestValue, c.intToValueMappings))));
        let numerics = await numericTask;
        result = result.concat(numerics.result.map(c => (new NumericCriterion(c.id, c.clientId, c.criterionName, c.minValue, c.maxValue, c.worstValue, c.bestValue))));
        let floats = await floatTask;
        result = result.concat(floats.result.map(c =>(new FloatCriterion(c.id, c.clientId, c.criterionName, c.minValue, c.maxValue, c.worstValue, c.bestValue))));
        let documents = await documentTask;
        result = result.concat(documents.result.map(d =>(new DocumentCriterion(d.id, d.clientId, d.criterionName))));
        return result;
    }

    const sortCriteriaByName = (criteria: Criterion[]) : Criterion[] => {
        return criteria.sort((a, b) => Helper.normalize(a.criterionName) < Helper.normalize(b.criterionName) ? -1 : Helper.normalize(a.criterionName) > Helper.normalize(b.criterionName) ? 1 : 0);  
    }
    
    return (
        <div id="ccp-criteria-container">
            <div id="ccp-welcome-panel">
                <h1>WELCOME TO</h1>
                <Figure>
                    <Figure.Image
                        width={250}
                        height={180}
                        src={logo}
                        alt="logo"
                    />
                </Figure>
                {currentClient.userId == userId ?  <h3>{currentClient.name} (your company)</h3>
                :  
                <h3>{currentClient.name}</h3>
                }
                <h4>Available criteria</h4>
            </div>
            <div id="ccp-criteria-list">
                <ListGroup>
                    {criteria.length > 0 ? criteria.map(criterion => (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center" key={criterion.id}>
                            <div className="ccp-item-container">
                                <div className="ccp-item-member-name-panel">
                                <span className="ccp-item-member">{criterion.criterionName}</span>
                               </div>
                               {userId == currentClient.userId ?
                                    <div className="ccp-item-member-button-panel">
                                        <Button className="ccp-item-member ccp-item-member-button-panel-button" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                        <Button className="ccp-item-member ccp-item-member-button-panel-button" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>
                                    </div>
                                    :
                                    <div className="ccp-item-member-button-panel">
                                        <Button className="ccp-item-member ccp-item-member-button-panel-button" variant="dark" onClick={() => handleViewCriterionClick(criterion)}>View</Button>
                                        <Button className="ccp-item-member ccp-item-member-button-panel-button" variant="dark" onClick={() => handleViewRatingsClick(criterion)}>Ratings</Button>      
                                        <Button className="ccp-item-member ccp-item-member-button-panel-button" variant="dark" onClick={() => handleRateClick(criterion)}>Rate</Button>                              
                                    </div>                 
                               }
                            </div>
                        </ListGroup.Item>
                    )): 
                    <h3>No criteria available!</h3>}
                </ListGroup>
            </div>
            <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => handleHomeClick()} onLogOutClick={() => handleLogOutClick()} 
                          onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
            <div id="ccp-criteria-button-panel">
                <Button  className="ccp-criteria-button-panel-button" variant="dark" onClick={() => {navigate(-1)}}>Back</Button>
            </div>
        </div>
    )
}

export default CompanyCriteriaPage;