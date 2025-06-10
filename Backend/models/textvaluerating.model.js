class TextValueRating{
    constructor(id, userId, criterionId, dateOfRating, textValueInt){
        this.id = id;
        this.userId = userId;
        this.ratingCriterionId = criterionId;
        this.dateOfRating = dateOfRating;
        this.textValueInt = textValueInt;
    }
}

module.exports = TextValueRating;