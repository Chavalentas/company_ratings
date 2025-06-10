class FloatRangeRating{
    constructor(id, userId, criterionId, dateOfRating, ratingValue){
        this.id = id;
        this.userId = userId;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.ratingValue = ratingValue;
    }
}

module.exports = FloatRangeRating;