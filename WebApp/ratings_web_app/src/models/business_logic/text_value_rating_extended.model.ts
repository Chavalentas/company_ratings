import { RatingExtended } from "./rating_extended.model";

export class TextValueRatingExtended extends RatingExtended{
    textValueInt: number;

    constructor(id: number, userId: number, userName: string, ratingCriterionId: number, dateOfRating: Date, textValueInt: number){
        super(id, userId, userName, ratingCriterionId, dateOfRating);
        this.textValueInt = textValueInt;
    }
}