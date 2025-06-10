import { Client } from "../models/business_logic/client.model";
import { CommentCriterion } from "../models/business_logic/comment_criterion.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { Rating } from "../models/business_logic/rating.model";

export interface ViewCommentRatingsContentProps{
    criterion: CommentCriterion;
    client: Client;
    onBackButton: () => void;
    onRateCriterion: (criterion: Criterion) => void;
}