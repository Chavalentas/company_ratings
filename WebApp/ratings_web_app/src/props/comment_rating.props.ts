import { CommentCriterion } from "../models/business_logic/comment_criterion.model";
import { CommentRating } from "../models/business_logic/comment_rating.model";

export interface CommentRatingProps{
    criterion: CommentCriterion;
    onBackButtonClick: () => void;
    onSubmitClick: (commentRating: CommentRating) => void; 
}