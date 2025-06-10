import { TextValueCriterion } from "../models/business_logic/text_value_criterion.model";
import { TextValueRating } from "../models/business_logic/text_value_rating.model";

export interface TextValueRatingProps{
    criterion: TextValueCriterion;
    onBackButtonClick: () => void;
    onSubmitClick: (textValueRating: TextValueRating) => void; 
}