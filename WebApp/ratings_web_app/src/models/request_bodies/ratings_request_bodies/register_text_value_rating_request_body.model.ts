export interface RegisterTextValueRatingRequestBody{
    userId: number;
    ratingCriterionId: number;
    dateOfRating: string;
    textValueInt: number;
}