export interface RegisterCommentRatingRequestBody{
    userId: number;
    ratingCriterionId: number;
    dateOfRating: string;
    comment: string;
}