import { CommentRating } from "../../comment_rating.model";
import { DocumentRating } from "../../document_rating.model";
import { FloatRating } from "../../float_rating.model";
import { NumericRating } from "../../numeric_rating.model";
import { TextValueRating } from "../../text_value_rating.model";

export interface RatingVisitor<T>{
    visitNumberRangeRating(criterion: NumericRating): T;
    visitFloatRangeRating(criterion: FloatRating): T;
    visitCommentRating(criterion: CommentRating): T;
    visitTextValueRating(criterion: TextValueRating): T;
    visitDocumentRating(criterion: DocumentRating): T;
}