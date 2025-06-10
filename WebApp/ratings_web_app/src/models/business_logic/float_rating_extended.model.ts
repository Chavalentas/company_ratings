import { RatingExtended } from "./rating_extended.model";

export class FloatRatingExtended extends RatingExtended{
    ratingValue: number;

    constructor(id: number, userId: number, userName: string, ratingCriterionId: number, dateOfRating: Date, ratingValue: number){
        super(id, userId, userName, ratingCriterionId, dateOfRating);
        this.ratingValue = ratingValue;
    }
}