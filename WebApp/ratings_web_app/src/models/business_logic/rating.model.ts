import { RatingVisitor } from "./visitors/rating_visitors/rating_return_type_visitor.model";

export abstract class Rating{
    id: number;
    userId: number;
    ratingCriterionId: number;
    dateofRating: Date;
    
    constructor(id: number, userId: number, ratingCriterionId: number, dateOfRating: Date){
        this.id = id;
        this.userId = userId;
        this.ratingCriterionId = ratingCriterionId;
        this.dateofRating = dateOfRating;
    }

    abstract acceptVisitor<T>(visitor: RatingVisitor<T>): T;
}