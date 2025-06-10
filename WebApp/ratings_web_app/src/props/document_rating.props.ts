import { DocumentCriterion } from "../models/business_logic/document_criterion.model";
import { DocumentRating } from "../models/business_logic/document_rating.model";

export interface DocumentRatingProps{
    criterion: DocumentCriterion;
    isSpinning: boolean;
    onBackButtonClick: () => void;
    onSubmitClick: (documentRating: DocumentRating) => void; 
}