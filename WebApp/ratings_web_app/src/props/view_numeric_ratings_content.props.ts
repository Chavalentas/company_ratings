import { Client } from "../models/business_logic/client.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { NumericCriterion } from "../models/business_logic/numeric_criterion.model";
import { Rating } from "../models/business_logic/rating.model";

export interface ViewNumericRatingsContentProps{
    criterion: NumericCriterion;
    client: Client;
    onBackButton: () => void;
    onRateCriterion: (criterion: Criterion) => void;
}