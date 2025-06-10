export interface RegisterNumericCriterionRequestBody{
    clientId: number;
    criterionName: string;
    minValue: number;
    maxValue: number;
    worstValue: number;
    bestValue: number;
}