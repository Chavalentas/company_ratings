import { Rating } from "./rating.model";
import { RatingVisitor } from "./visitors/rating_visitors/rating_return_type_visitor.model";

export class TextValueRating extends Rating{
    textValueInt: number;

    constructor(id: number, userId: number, ratingCriterionId: number, dateOfRating: Date, textValueInt: number){
        super(id, userId, ratingCriterionId, dateOfRating);
        this.textValueInt = textValueInt;
    }

    public acceptVisitor<T>(visitor: RatingVisitor<T>): T {
        return visitor.visitTextValueRating(this);
    }
}