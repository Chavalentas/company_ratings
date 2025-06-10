import { Client } from "../models/business_logic/client.model";
import { CommentCriterion } from "../models/business_logic/comment_criterion.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { DocumentCriterion } from "../models/business_logic/document_criterion.model";
import { FloatCriterion } from "../models/business_logic/float_criterion.model";
import { NumericCriterion } from "../models/business_logic/numeric_criterion.model";
import { Rating } from "../models/business_logic/rating.model";
import { TextValueCriterion } from "../models/business_logic/text_value_criterion.model";

export interface ViewRatingsContentProps{
    commentCriterion: CommentCriterion;
    floatCriterion: FloatCriterion;
    numericCriterion: NumericCriterion;
    textValueCriterion: TextValueCriterion;
    documentCriterion: DocumentCriterion;
    criterionType: string;
    client: Client;
    onBackButtonClick: () => void;
    onRateCriterionClick: (criterion: Criterion) => void;
}