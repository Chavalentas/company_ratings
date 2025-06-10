class NumberRangeRatingExtended{
    constructor(id, userId, userName, criterionId, dateOfRating, ratingValue){
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.ratingValue = ratingValue;
    }
}

module.exports = NumberRangeRatingExtended;