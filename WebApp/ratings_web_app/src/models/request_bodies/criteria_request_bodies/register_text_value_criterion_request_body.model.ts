import { TextCriterionIntValue } from "../../business_logic/text_criterion_int_value.model";

export interface RegisterTextValueCriterionRequestBody{
    clientId: number;
    criterionName: string;
    minValue: number;
    maxValue: number;
    worstValue: number;
    bestValue: number;
    intToValueMappings: TextCriterionIntValue[];
}