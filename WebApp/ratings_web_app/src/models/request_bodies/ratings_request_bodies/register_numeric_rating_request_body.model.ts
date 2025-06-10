export interface RegisterNumericRatingRequestBody{
    userId: number;
    ratingCriterionId: number;
    dateOfRating: string;
    ratingValue: number;
}