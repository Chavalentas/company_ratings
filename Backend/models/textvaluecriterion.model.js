class TextValueCriterion{
    constructor(id, clientId, criterionName, minValue, maxValue, bestValue, worstValue, intToValueMappings){
        this.id = id;
        this.clientId = clientId;
        this.criterionName = criterionName;
        this.minValue = minValue; 
        this.maxValue = maxValue; 
        this.bestValue = bestValue;
        this.worstValue = worstValue;
        this.intToValueMappings = intToValueMappings;
    }
}

module.exports = TextValueCriterion;