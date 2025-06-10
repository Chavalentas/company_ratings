export abstract class RatingExtended{
    id: number;
    userId: number;
    userName: string;
    ratingCriterionId: number;
    dateofRating: Date;
    
    constructor(id: number, userId: number, userName: string, ratingCriterionId: number, dateOfRating: Date){
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.ratingCriterionId = ratingCriterionId;
        this.dateofRating = dateOfRating;
    }
}