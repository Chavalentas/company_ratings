class TextValueRatingExtended{
    constructor(id, userId, userName, criterionId, dateOfRating, textValueInt){
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.textValueInt = textValueInt;
    }
}

module.exports = TextValueRatingExtended;