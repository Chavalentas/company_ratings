import { CommentCriterion } from "../models/business_logic/comment_criterion.model";
import { CommentRating } from "../models/business_logic/comment_rating.model";
import { DocumentCriterion } from "../models/business_logic/document_criterion.model";
import { DocumentRating } from "../models/business_logic/document_rating.model";
import { FloatCriterion } from "../models/business_logic/float_criterion.model";
import { FloatRating } from "../models/business_logic/float_rating.model";
import { NumericCriterion } from "../models/business_logic/numeric_criterion.model";
import { NumericRating } from "../models/business_logic/numeric_rating.model";
import { TextValueCriterion } from "../models/business_logic/text_value_criterion.model";
import { TextValueRating } from "../models/business_logic/text_value_rating.model";

export interface AddRatingCardContentProps{
    commentCriterion: CommentCriterion;
    floatCriterion: FloatCriterion;
    numericCriterion: NumericCriterion;
    textValueCriterion: TextValueCriterion;
    documentCriterion: DocumentCriterion;
    isSpinning: boolean;
    criterionType: string;
    onBackButtonClick: () => void;
    onSubmitNumericRatingClick: (rating: NumericRating) => void;
    onSubmitFloatRatingClick: (rating: FloatRating) => void;
    onSubmitCommentRatingClick: (rating: CommentRating) => void;
    onSubmitTextValueRatingClick: (rating: TextValueRating) => void;
    onSubmitDocumentRatingClick: (rating: DocumentRating) => void;
}