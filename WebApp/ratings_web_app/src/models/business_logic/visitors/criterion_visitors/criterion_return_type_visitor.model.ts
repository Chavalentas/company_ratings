import { CommentCriterion } from "../../comment_criterion.model";
import { DocumentCriterion } from "../../document_criterion.model";
import { FloatCriterion } from "../../float_criterion.model";
import { NumericCriterion } from "../../numeric_criterion.model";
import { TextValueCriterion } from "../../text_value_criterion.model";

export interface CriterionVisitor<T>{
    visitNumberRangeCriterion(criterion: NumericCriterion): T;
    visitFloatRangeCriterion(criterion: FloatCriterion): T;
    visitCommentCriterion(criterion: CommentCriterion): T;
    visitTextValueCriterion(criterion: TextValueCriterion): T;
    visitDocumentCriterion(criterion: DocumentCriterion): T;
}