import { CommentCriterion } from "./comment_criterion.model";
import { DocumentCriterion } from "./document_criterion.model";
import { FloatCriterion } from "./float_criterion.model";
import { NumericCriterion } from "./numeric_criterion.model";
import { TextValueCriterion } from "./text_value_criterion.model";

export interface LoadedSeparatedCriteria{
    numericCriteria: NumericCriterion[];
    floatCriteria: FloatCriterion[];
    commentCriteria: CommentCriterion[];
    textValueCriteria: TextValueCriterion[];
    documentCriteria: DocumentCriterion[];
}