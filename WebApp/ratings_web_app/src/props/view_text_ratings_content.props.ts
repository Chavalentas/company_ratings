import { Client } from "../models/business_logic/client.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { Rating } from "../models/business_logic/rating.model";
import { TextValueCriterion } from "../models/business_logic/text_value_criterion.model";

export interface ViewTextRatingsContentProps{
    criterion: TextValueCriterion;
    client: Client;
    onBackButton: () => void;
    onRateCriterion: (criterion: Criterion) => void;
}