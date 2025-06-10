class DocumentRatingExtended{
    constructor(id, userId, userName, criterionId, dateOfRating, documentName, documentData){
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.documentName = documentName;
        this.documentData = documentData;
    }
}

module.exports = DocumentRatingExtended;