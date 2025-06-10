import { Criterion } from "./criterion.model";
import { CriterionVisitor } from "./visitors/criterion_visitors/criterion_return_type_visitor.model";

export class NumericCriterion extends Criterion{
    minValue: number;
    maxValue: number;
    bestValue: number;
    worstValue: number;

    constructor(id: number, clientId: number, criterionName: string, minValue: number, maxValue: number, worstvalue: number, bestValue: number){
        super(id, clientId, criterionName);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.bestValue = bestValue;
        this.worstValue = worstvalue;
        this.checkValues(this.minValue, this.maxValue, this.worstValue, this.bestValue);
    }

    public acceptVisitor<T>(visitor: CriterionVisitor<T>): T {
        return visitor.visitNumberRangeCriterion(this);
    }

    private checkValues(minValue: number, maxValue: number, worstValue: number, bestValue: number): void{
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
    }
}