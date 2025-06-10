export interface RegisterDocumentRatingRequestBody{
    userId: number;
    ratingCriterionId: number;
    dateOfRating: string;
    documentName: string;
    documentData: string;
}