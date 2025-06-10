import { FloatCriterion } from "../models/business_logic/float_criterion.model";
import { FloatRating } from "../models/business_logic/float_rating.model";

export interface FloatRatingProps{
    criterion: FloatCriterion;
    onBackButtonClick: () => void;
    onSubmitClick: (floatRating: FloatRating) => void; 
}