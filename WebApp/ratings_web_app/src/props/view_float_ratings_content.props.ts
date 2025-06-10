import { Client } from "../models/business_logic/client.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { FloatCriterion } from "../models/business_logic/float_criterion.model";
import { Rating } from "../models/business_logic/rating.model";

export interface ViewFloatRatingsContentProps{
    criterion: FloatCriterion;
    client: Client;
    onBackButton: () => void;
    onRateCriterion: (criterion: Criterion) => void;
}