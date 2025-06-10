import { Rating } from "./rating.model";
import { RatingVisitor } from "./visitors/rating_visitors/rating_return_type_visitor.model";

export class CommentRating extends Rating{
    comment: string;

    constructor(id: number, userId: number, ratingCriterionId: number, dateOfRating: Date, comment: string){
        super(id, userId, ratingCriterionId, dateOfRating);
        this.comment = comment;
    }

    public acceptVisitor<T>(visitor: RatingVisitor<T>): T {
        return visitor.visitCommentRating(this);
    }
}