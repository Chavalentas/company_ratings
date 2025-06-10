import { CommentCriterion } from "../../comment_criterion.model";
import { DocumentCriterion } from "../../document_criterion.model";
import { FloatCriterion } from "../../float_criterion.model";
import { NumericCriterion } from "../../numeric_criterion.model";
import { TextValueCriterion } from "../../text_value_criterion.model";
import { CriterionVisitor } from "./criterion_return_type_visitor.model";

export class IdentifyCriterionVisitor implements CriterionVisitor<string>{
    visitDocumentCriterion(criterion: DocumentCriterion): string {
        return "document";
    }
    visitNumberRangeCriterion(criterion: NumericCriterion): string {
        return "numeric";
    }
    visitFloatRangeCriterion(criterion: FloatCriterion): string {
        return "float";
    }
    visitCommentCriterion(criterion: CommentCriterion): string {
        return "comment";
    }
    visitTextValueCriterion(criterion: TextValueCriterion): string {
        return "text";
    }
}