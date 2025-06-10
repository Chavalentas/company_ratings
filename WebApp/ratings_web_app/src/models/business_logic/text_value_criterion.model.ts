import { Criterion } from "./criterion.model";
import { Helper } from "./helper.model";
import { TextCriterionIntValue } from "./text_criterion_int_value.model";
import { CriterionVisitor } from "./visitors/criterion_visitors/criterion_return_type_visitor.model";

export class TextValueCriterion extends Criterion{
    minValue: number;
    maxValue: number;
    bestValue: number;
    worstValue: number;
    intToValueMappings: TextCriterionIntValue[];

    constructor(id: number, clientId: number, criterionName: string, minValue: number, maxValue: number, worstvalue: number, bestValue: number, intToValueMappings: TextCriterionIntValue[]){
       super(id, clientId, criterionName);
       this.minValue = minValue;
       this.maxValue = maxValue;
       this.bestValue = bestValue;
       this.worstValue = worstvalue;
       this.intToValueMappings = intToValueMappings;
       this.checkValues(this.minValue, this.maxValue, this.bestValue, this.worstValue, this.intToValueMappings);
    }

    public acceptVisitor<T>(visitor: CriterionVisitor<T>): T {
        return visitor.visitTextValueCriterion(this);
    }

    private checkValues(minValue: number, maxValue: number, bestValue: number, worstValue: number, intToValueMappings: TextCriterionIntValue[]){
        if (minValue >= maxValue){
            throw new Error("minValue must be less than maxValue!");
        }

        if (!(minValue == worstValue || minValue == bestValue)){
            throw new Error("minValue must equal either to worstValue or bestValue!");
        }

        if (!(maxValue == worstValue || maxValue == bestValue)){
            throw new Error("bestValue must equal either to worstValue or bestValue!");
        }

        if (worstValue == bestValue){
            throw new Error("worstValue cannot equal to bestValue!");
        }

        let ints: number[] = intToValueMappings.map(c => c.int);
        let values: string[] = intToValueMappings.map(c => c.value);

        if (!Helper.allUnique(ints)){
            throw new Error("integer values in mapping must be unique!");
        }

        if (!Helper.allUnique(values)){
            throw new Error("values in mapping must be unique!");
        }

        if (ints.some(e => !(e >= minValue && e <= maxValue))){
            throw new Error("All integers in the mapping must be within valid range!");
        }
    }
}