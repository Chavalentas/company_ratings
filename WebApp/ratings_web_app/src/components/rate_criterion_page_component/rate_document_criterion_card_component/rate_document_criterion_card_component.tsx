import { useEffect, useState } from "react";
import { DocumentRatingProps } from "../../../props/document_rating.props";
import "./rate_document_criterion_card_component.css";
import ratingsConfig from "../../../config/rating_settings.config.json";
import { DocumentCriterion } from "../../../models/business_logic/document_criterion.model";
import { Button, Card, Spinner } from "react-bootstrap";
import Sidebar from "../../sidebar_menu_component/sidebar_menu_component";
import { useNavigate } from "react-router-dom";
import { read } from "fs";
import { Helper } from "../../../models/business_logic/helper.model";
import { DocumentRating } from "../../../models/business_logic/document_rating.model";
import {Buffer} from 'buffer';

const RateDocumentCriterionCard = (props: DocumentRatingProps) => {
    const navigate = useNavigate();
    const [currentCriterion, setDocumentCriterion] = useState<DocumentCriterion>(props.criterion);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(true);
    const [currentDataName, setCurrentDataName] = useState<string>("");
    const [currentByteSize, setCurrentByteSize] = useState(0);
    const [allowedMaximalByteSize, setAllowedMaximalByteSize] = useState(ratingsConfig.documentRatingMaxSizeInKb);
    const [currentBuffer, setCurrentBuffer] = useState<Buffer>(Buffer.alloc(0));
    const [ratingError, setRatingError] = useState("");

    useEffect(() => {
        setIsSpinnerVisible(false);
        setDocumentCriterion(props.criterion);
        setIsSpinnerVisible(props.isSpinning);
        setAllowedMaximalByteSize(ratingsConfig.documentRatingMaxSizeInKb);
    },[props]);

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

    const handleSubmitButtonClick = () => {
        setRatingError("");

        if (currentDataName.length == 0){
            setRatingError("Please upload a valid PDF file!");
            return;
        }

        if (Math.floor(currentByteSize/1000 * 100)/100 > allowedMaximalByteSize){
            setRatingError("Please note the maximum PDF file upload size!");
            return;
        }

        let rating = new DocumentRating(0, 0, currentCriterion.id, new Date(), currentDataName, currentBuffer);
        props.onSubmitClick(rating);
    }

    const handleUploadPdfClick = () => {
        setRatingError("")
        let input = document.createElement('input');

        input.type = 'file';
        input.accept = 'application/pdf';
        input.onchange = _ => {
            let files: FileList = input.files as FileList;

            if (files.length > 0){
                let firstFile = files[0];
                let name = firstFile.name;
                setCurrentByteSize(firstFile.size);
                setCurrentDataName(name);
                getContentAsync(firstFile).then((content) => {
                    setCurrentBuffer(Buffer.from(content));
                })   
            }
        };

        input.click();
    }

    const getContentAsync = (file: File): Promise<ArrayBuffer> => {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            if (file.name.length == 0){
                reject("fileName was empty!");
            }

            let reader = new FileReader();

            reader.onload = function(e) {
                let arrayBuffer = e.target?.result as ArrayBuffer;
                resolve(arrayBuffer);
            }

            reader.readAsArrayBuffer(file);
        })
    }

    return (
        <Card id="rdcc-rate-criterion-card">
            <Card.Body>
                <div id="rdcc-rate-criterion-card-header">
                    <Card.Title><h2>{currentCriterion.criterionName}</h2></Card.Title>
                </div>
                <div id="rdcc-rate-criterion-card-body">
                    <div className="rdcc-rate-criterion-card-body-member">
                        <div id="rdcc-rating-path-container">
                            <div id="rdcc-rating-indicator-container">
                                <h5>Document name (max {allowedMaximalByteSize} KB)</h5>
                            </div>
                            <div id="rdcc-path-value-container">
                                <span>{currentDataName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="rdcc-rate-criterion-card-body-member">
                        <div id="rdcc-upload-file-button-panel">
                            <Button className="rdcc-upload-file-button-panel-button" variant="dark" onClick={() => handleUploadPdfClick()}>Upload a PDF</Button>
                        </div>
                    </div>
                    {isSpinnerVisible ? 
                        <div id="rdcc-loading-spinner-container">
                            <Spinner  animation="border" role="status" id="rdcc-loading-spinner">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                   : null}
                </div>
            </Card.Body>
            <div id="rdcc-rate-criterion-card-button-panel">
                <Button className="rdcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {props.onBackButtonClick()}}>Back</Button>
                <Button type="submit" className="rdcc-rate-criterion-card-button-panel-button" variant="dark" onClick={() => {handleSubmitButtonClick()}}>Submit</Button>
            </div>
            <div id="rdcc-error-panel">
                <span>{ratingError}</span>
            </div>
          <Sidebar onAboutClick={() => handleAboutClick()} onHomeClick={() => {}} onLogOutClick={() => handleLogOutClick()} 
                                 onProfileClick={() => handleProfileClick()} onYourCompaniesClick={() => handleYourCompaniesClick()}/>
    </Card>
    );
};

export default RateDocumentCriterionCard;