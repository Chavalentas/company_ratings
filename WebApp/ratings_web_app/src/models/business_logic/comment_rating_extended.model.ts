import { RatingExtended } from "./rating_extended.model";

export class CommentRatingExtended extends RatingExtended{
    comment: string;

    constructor(id: number, userId: number, userName: string, ratingCriterionId: number, dateOfRating: Date, comment: string){
        super(id, userId, userName, ratingCriterionId, dateOfRating);
        this.comment = comment;
    }
}