import { Rating } from "./rating.model";
import { RatingVisitor } from "./visitors/rating_visitors/rating_return_type_visitor.model";

export class FloatRating extends Rating{
    ratingValue: number;

    constructor(id: number, userId: number, ratingCriterionId: number, dateOfRating: Date, ratingValue: number){
        super(id, userId, ratingCriterionId, dateOfRating);
        this.ratingValue = ratingValue;
    }

    public acceptVisitor<T>(visitor: RatingVisitor<T>): T {
        return visitor.visitFloatRangeRating(this);
    }
}