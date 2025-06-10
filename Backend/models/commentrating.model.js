class CommentRating{
    constructor(id, userId, criterionId, dateOfRating, comment){
        this.id = id;
        this.userId = userId;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.comment = comment;
    }
}

module.exports = CommentRating;