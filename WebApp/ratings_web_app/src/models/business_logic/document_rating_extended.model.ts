import { RatingExtended } from "./rating_extended.model";

export class DocumentRatingExtended extends RatingExtended{
    documentName: string;
    documentData: Buffer;

    constructor(id: number, userId: number, userName: string, ratingCriterionId: number, dateOfRating: Date, documentName: string,
        documentData: Buffer){
        super(id, userId, userName, ratingCriterionId, dateOfRating);
        this.documentName = documentName;
        this.documentData = documentData;
    }
}