export interface RegisterFloatCriterionRequestBody{
    clientId: number;
    criterionName: string;
    minValue: number;
    maxValue: number;
    worstValue: number;
    bestValue: number;
}