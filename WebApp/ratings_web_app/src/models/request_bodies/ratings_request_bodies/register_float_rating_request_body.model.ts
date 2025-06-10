export interface RegisterFloatRatingRequestBody{
    userId: number;
    ratingCriterionId: number;
    dateOfRating: string;
    ratingValue: number;
}