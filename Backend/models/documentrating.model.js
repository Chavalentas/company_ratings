class DocumentRating{
    constructor(id, userId, criterionId, dateOfRating, documentName, documentData){
        this.id = id;
        this.userId = userId;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.documentName = documentName;
        this.documentData = documentData;
    }
}

module.exports = DocumentRating;