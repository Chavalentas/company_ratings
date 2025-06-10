class FloatRangeCriterion{
    constructor(id, clientId, criterionName, minValue, maxValue, bestValue, worstValue){
        this.id = id;
        this.clientId = clientId;
        this.criterionName = criterionName;
        this.minValue = minValue; 
        this.maxValue = maxValue; 
        this.bestValue = bestValue;
        this.worstValue = worstValue;
    }
}

module.exports = FloatRangeCriterion;