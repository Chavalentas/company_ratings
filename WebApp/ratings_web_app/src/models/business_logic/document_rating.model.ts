import { Rating } from "./rating.model";
import { RatingVisitor } from "./visitors/rating_visitors/rating_return_type_visitor.model";

export class DocumentRating extends Rating{
    documentName: string;
    documentData: Buffer;

    constructor(id: number, userId: number, ratingCriterionId: number, dateOfRating: Date, documentName: string, documentData: Buffer){
        super(id, userId, ratingCriterionId, dateOfRating);
        this.documentName = documentName;
        this.documentData = documentData;
    }

    public acceptVisitor<T>(visitor: RatingVisitor<T>): T {
        return visitor.visitDocumentRating(this);
    }
}