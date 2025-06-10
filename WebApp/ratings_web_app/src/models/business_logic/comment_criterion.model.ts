import { Criterion } from "./criterion.model";
import { CriterionVisitor } from "./visitors/criterion_visitors/criterion_return_type_visitor.model";

export class CommentCriterion extends Criterion{
    constructor(id: number, clientId: number, criterionName: string){
        super(id, clientId, criterionName);
    }

    public acceptVisitor<T>(visitor: CriterionVisitor<T>): T {
        return visitor.visitCommentCriterion(this);
    }
}