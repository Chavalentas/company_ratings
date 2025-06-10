import { Client } from "../models/business_logic/client.model";
import { Criterion } from "../models/business_logic/criterion.model";
import { DocumentCriterion } from "../models/business_logic/document_criterion.model";

export interface ViewDocumentRatingsContentProps{
    criterion: DocumentCriterion;
    client: Client;
    onBackButton: () => void;
    onRateCriterion: (criterion: Criterion) => void;
}