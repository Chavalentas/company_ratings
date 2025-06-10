class CommentRatingExtended{
    constructor(id, userId, userName, criterionId, dateOfRating, comment){
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.comment = comment;
    }
}

module.exports = CommentRatingExtended;