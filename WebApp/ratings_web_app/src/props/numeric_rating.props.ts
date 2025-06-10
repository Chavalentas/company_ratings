import { NumericCriterion } from "../models/business_logic/numeric_criterion.model";
import { NumericRating } from "../models/business_logic/numeric_rating.model";

export interface NumericRatingProps{
    criterion: NumericCriterion;
    onBackButtonClick: () => void;
    onSubmitClick: (numericRating: NumericRating) => void; 
}