import { CriterionVisitor } from "./visitors/criterion_visitors/criterion_return_type_visitor.model";

export abstract class Criterion{
    id: number;
    clientId: number;
    criterionName: string;

    constructor(id: number, clientId: number, criterionName: string){
        this.id = id;
        this.clientId = clientId;
        this.criterionName = criterionName;
    }

    abstract acceptVisitor<T>(visitor: CriterionVisitor<T>): T;
}