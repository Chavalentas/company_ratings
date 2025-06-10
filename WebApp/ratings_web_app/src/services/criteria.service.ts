import { NumericCriterion } from "../models/business_logic/numeric_criterion.model";
import { RegisterNumericCriterionResponseBody } from "../models/response_bodies/criteria_response_bodies/register_numeric_criterion_response_body.model";
import axios from "axios";
import { ErrorMessageResponseBody } from "../models/response_bodies/users_response_bodies/error_message_response_body.model";
import { RegisterNumericCriterionRequestBody } from "../models/request_bodies/criteria_request_bodies/register_numeric_criterion_request_body.model";
import { FloatCriterion } from "../models/business_logic/float_criterion.model";
import { RegisterFloatCriterionResponseBody } from "../models/response_bodies/criteria_response_bodies/register_float_criterion_response_body.model";
import { RegisterFloatCriterionRequestBody } from "../models/request_bodies/criteria_request_bodies/register_float_criterion_request_body.model";
import { CommentCriterion } from "../models/business_logic/comment_criterion.model";
import { RegisterCommentCriterionRequestBody } from "../models/request_bodies/criteria_request_bodies/register_comment_criterion_request_body.model";
import { RegisterCommentCriterionResponseBody } from "../models/response_bodies/criteria_response_bodies/register_comment_criterion_response_body.model";
import { TextValueCriterion } from "../models/business_logic/text_value_criterion.model";
import { RegisterTextValueCriterionResponseBody } from "../models/response_bodies/criteria_response_bodies/registe_text_value_criterion_response_body.model";
import { RegisterTextValueCriterionRequestBody } from "../models/request_bodies/criteria_request_bodies/register_text_value_criterion_request_body.model";
import { DeleteCriterionByIdResponseBody } from "../models/response_bodies/criteria_response_bodies/delete_criterion_by_id_response_body.model";
import { DeleteCriteriaByClientIdResponseBody } from "../models/response_bodies/criteria_response_bodies/delete_criteria_by_client_id_reponse_body.model";
import { GetNumericCriteriaResponseBody } from "../models/response_bodies/criteria_response_bodies/get_numeric_criteria_response_body.model";
import { GetFloatCriteriaResponseBody } from "../models/response_bodies/criteria_response_bodies/get_float_criteria_response_body.model";
import { GetCommentCriteriaResponseBody } from "../models/response_bodies/criteria_response_bodies/get_comment_criteria_response_body.model";
import { GetTextCriteriaResponseBody } from "../models/response_bodies/criteria_response_bodies/get_text_criteria_response_body.model";
import { DocumentCriterion } from "../models/business_logic/document_criterion.model";
import { RegisterDocumentCriterionResponseBody } from "../models/response_bodies/criteria_response_bodies/register_document_criterion_response_body.model";
import { RegisterDocumentCriterionRequestBody } from "../models/request_bodies/criteria_request_bodies/regisster_document_criterion_request_body.model";
import { GetDocumentCriteriaResponseBody } from "../models/response_bodies/criteria_response_bodies/get_document_criteria_response_body.model";

export class CriteriaService{
    url: string;

    constructor(criteriaUrl: string){
        this.url = "";
        this.setUrl(criteriaUrl);
    }

    public registerNumericCriterion(criterion: NumericCriterion): Promise<RegisterNumericCriterionResponseBody>{
        return new Promise<RegisterNumericCriterionResponseBody>((resolve, reject) => {
            let reqBody = {clientId: criterion.clientId, criterionName: criterion.criterionName, minValue: criterion.minValue,
                maxValue: criterion.maxValue, worstValue: criterion.worstValue, bestValue: criterion.bestValue
            } as RegisterNumericCriterionRequestBody;
            axios.post<RegisterNumericCriterionResponseBody>(`${this.url}/new/numberrange`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerFloatCriterion(criterion: FloatCriterion): Promise<RegisterFloatCriterionResponseBody>{
        return new Promise<RegisterFloatCriterionResponseBody>((resolve, reject) => {
            let reqBody = {clientId: criterion.clientId, criterionName: criterion.criterionName, minValue: criterion.minValue,
                maxValue: criterion.maxValue, worstValue: criterion.worstValue, bestValue: criterion.bestValue
            } as RegisterFloatCriterionRequestBody;
            axios.post<RegisterFloatCriterionResponseBody>(`${this.url}/new/floatrange`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerCommentCriterion(criterion: CommentCriterion): Promise<RegisterCommentCriterionResponseBody>{
        return new Promise<RegisterCommentCriterionResponseBody>((resolve, reject) => {
            let reqBody = {clientId: criterion.clientId, criterionName: criterion.criterionName} as RegisterCommentCriterionRequestBody;
            axios.post<RegisterCommentCriterionResponseBody>(`${this.url}/new/comment`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerDocumentCriterion(criterion: DocumentCriterion): Promise<RegisterDocumentCriterionResponseBody>{
        return new Promise<RegisterDocumentCriterionResponseBody>((resolve, reject) => {
            let reqBody = {clientId: criterion.clientId, criterionName: criterion.criterionName} as RegisterDocumentCriterionRequestBody;
            axios.post<RegisterDocumentCriterionResponseBody>(`${this.url}/new/document`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerTextValueCriterion(criterion: TextValueCriterion): Promise<RegisterTextValueCriterionResponseBody>{
        return new Promise<RegisterTextValueCriterionResponseBody>((resolve, reject) => {
            let reqBody = {clientId: criterion.clientId, criterionName: criterion.criterionName,
                minValue: criterion.minValue, maxValue: criterion.maxValue, bestValue: criterion.bestValue, worstValue: criterion.worstValue,
                intToValueMappings: criterion.intToValueMappings
            } as RegisterTextValueCriterionRequestBody;
            axios.post<RegisterTextValueCriterionResponseBody>(`${this.url}/new/textvalue`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public deleteCriterionById(criterionId: number): Promise<DeleteCriterionByIdResponseBody>{
        return new Promise<DeleteCriterionByIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriterionByIdResponseBody>(`${this.url}/${criterionId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteNumberCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/numberrange/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteFloatCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/floatrange/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteCommentCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/comment/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteDocumentCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/document/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteTextValueCriteriaByClientId(clientId: number): Promise<DeleteCriteriaByClientIdResponseBody>{
        return new Promise<DeleteCriteriaByClientIdResponseBody>((resolve, reject) => {
            axios.delete<DeleteCriteriaByClientIdResponseBody>(`${this.url}/deleteall/textvalue/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getNumberRangeCriteriaByClientId(clientId: number): Promise<GetNumericCriteriaResponseBody>{
        return new Promise<GetNumericCriteriaResponseBody>((resolve, reject) => {
            axios.get<GetNumericCriteriaResponseBody>(`${this.url}/numberrange/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getFloatRangeCriteriaByClientId(clientId: number): Promise<GetFloatCriteriaResponseBody>{
        return new Promise<GetFloatCriteriaResponseBody>((resolve, reject) => {
            axios.get<GetFloatCriteriaResponseBody>(`${this.url}/floatrange/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getCommentCriteriaByClientId(clientId: number): Promise<GetCommentCriteriaResponseBody>{
        return new Promise<GetCommentCriteriaResponseBody>((resolve, reject) => {
            axios.get<GetCommentCriteriaResponseBody>(`${this.url}/comment/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getDocumentCriteriaByClientId(clientId: number): Promise<GetDocumentCriteriaResponseBody>{
        return new Promise<GetDocumentCriteriaResponseBody>((resolve, reject) => {
            axios.get<GetDocumentCriteriaResponseBody>(`${this.url}/document/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getTextValueCriteriaByClientId(clientId: number): Promise<GetTextCriteriaResponseBody>{
        return new Promise<GetTextCriteriaResponseBody>((resolve, reject) => {
            axios.get<GetTextCriteriaResponseBody>(`${this.url}/textvalue/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    private setUrl(url: string){
        if (url === null || url.length === 0){
            throw new Error("url cannot be empty or undefined!");
        }

        this.url = url;
    }
}