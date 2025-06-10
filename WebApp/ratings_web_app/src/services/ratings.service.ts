import { NumericRating } from "../models/business_logic/numeric_rating.model";
import axios from "axios";
import { RegisterNumericRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/register_numeric_rating_response_body.model";
import { ErrorMessageResponseBody } from "../models/response_bodies/users_response_bodies/error_message_response_body.model";
import { RegisterNumericRatingRequestBody } from "../models/request_bodies/ratings_request_bodies/register_numeric_rating_request_body.model";
import { FloatRating } from "../models/business_logic/float_rating.model";
import { RegisterFloatRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/register_float_rating_response_body.model";
import { RegisterFloatRatingRequestBody } from "../models/request_bodies/ratings_request_bodies/register_float_rating_request_body.model";
import { CommentRating } from "../models/business_logic/comment_rating.model";
import { RegisterCommentRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/register_comment_rating_response_body.model";
import { RegisterCommentRatingRequestBody } from "../models/request_bodies/ratings_request_bodies/register_comment_rating_request_body.model";
import { TextValueRating } from "../models/business_logic/text_value_rating.model";
import { RegisterTextValueRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/register_text_value_rating_response_body.model";
import { RegisterTextValueRatingRequestBody } from "../models/request_bodies/ratings_request_bodies/register_text_value_rating_request_body.model";
import { DeleteRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/delete_rating_response_body.model";
import { GetNumberRatingsResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_number_ratings_response_body.model";
import { GetFloatRatingsResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_float_ratings_response_body.model";
import { GetCommentRatingsResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_comment_ratings_response_body.model";
import { GetTextValueRatingsResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_text_value_ratings_response_body.model";
import { GetAllNumberRatingsByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_number_ratings_by_criterion_response_body.model";
import { GetAllNumericRatingsByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_numeric_ratings_by_criterion_request.body.model";
import { GetAllFloatRatingsByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_float_ratings_by_criterion_response_body.model";
import { GetAllFloatRatingsByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_float_ratings_by_criterion_request_body.model";
import { GetAllCommentRatingsByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_comment_ratings_by_criterion_response_body.model";
import { GetAllCommentRatingsByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_comment_ratings_by_criterion_request_body.model";
import { GetAllTextRatingsByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_text_ratings_by_criterion_response_body.model";
import { GetAllTextRatingsByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_text_ratings_by_criterion_request_body.model";
import { GetAllFloatRatingsByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_float_ratings_by_criterion_extended_response_body.model";
import { GetAllFloatRatingsByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_float_ratings_by_criterion_extended_request_body.model";
import { GetAllCommentRatingsByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_comment_ratings_by_criterion_extended_request_body.model";
import { GetAllCommentRatingsByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_comment_ratings_by_criterion_extended_response_body.model";
import { GetAllTextRatingsByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_text_ratings_by_criterion_extended_response_body.model";
import { GetAllTextRatingsByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_text_ratings_by_criterion_extended_request_body.model";
import { GetAllNumericRatingsByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_numeric_ratings_by_criterion_extended_request_body.model";
import { GetAllNumberRatingsByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_number_ratings_by_criterion_extended_response_body.model";
import { DocumentRating } from "../models/business_logic/document_rating.model";
import { RegisterDocumentRatingResponseBody } from "../models/response_bodies/ratings_reponse_bodies/register_document_rating_response_body.model";
import { RegisterDocumentRatingRequestBody } from "../models/request_bodies/ratings_request_bodies/register_document_rating_request_body.model";
import { Helper } from "../models/business_logic/helper.model";
import { GetDocumentRatingsResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_document_ratings_response_body.model";
import { GetAllDocumentRatingsByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_document_ratings_by_criterion_request_body.model";
import { GetAllDocumentRatingsByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_document_ratings_by_criterion_response_body.model";
import { GetAllDocumentRatingsByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_document_ratings_by_criterion_extended_response_body.model";
import { GetAllDocumentRatingsByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_document_ratings_by_criterion_extended_request_body.model";
import { GetAllNumericRatingsAvgByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_numeric_ratings_avg_by_criterion_extended_response_body.model";
import { GetAllNumericRatingsAvgByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_numeric_ratings_avg_by_criterion_extended_request_body.model";
import { GetAllFloatRatingsAvgByCriterionExtendedResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_all_float_ratings_avg_by_criterion_extended_response_body.model";
import { GetAllFloatRatingsAvgByCriterionExtendedRequestBody } from "../models/request_bodies/ratings_request_bodies/get_all_float_ratings_avg_by_criterion_extended_request_body.model";
import { GetMostCommonTextRatingFromAllByCriterionResponseBody } from "../models/response_bodies/ratings_reponse_bodies/get_most_common_value_all_text_ratings_by_criterion_extended_response_body.model";
import { GetMostCommonTextRatingFromAllByCriterionRequestBody } from "../models/request_bodies/ratings_request_bodies/get_most_common_value_all_text_ratings_by_criterion_extended_request_body.model";

export class RatingsService{
    url: string;

    constructor(ratingsUrl: string){
        this.url = "";
        this.setUrl(ratingsUrl);
    }

    public registerNumericRating(rating: NumericRating): Promise<RegisterNumericRatingResponseBody>{
        return new Promise<RegisterNumericRatingResponseBody>((resolve, reject) => {
            let reqBody = {userId: rating.userId, ratingCriterionId: rating.ratingCriterionId, ratingValue: rating.ratingValue, 
                dateOfRating: rating.dateofRating.toLocaleString()
            } as RegisterNumericRatingRequestBody;
            axios.post<RegisterNumericRatingResponseBody>(`${this.url}/new/numberrange`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerFloatRating(rating: FloatRating): Promise<RegisterFloatRatingResponseBody>{
        return new Promise<RegisterFloatRatingResponseBody>((resolve, reject) => {
            let reqBody = {userId: rating.userId, ratingCriterionId: rating.ratingCriterionId, ratingValue: rating.ratingValue, 
                dateOfRating: rating.dateofRating.toLocaleString()
            } as RegisterFloatRatingRequestBody;
            axios.post<RegisterNumericRatingResponseBody>(`${this.url}/new/floatrange`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerCommentRating(rating: CommentRating): Promise<RegisterCommentRatingResponseBody>{
        return new Promise<RegisterCommentRatingResponseBody>((resolve, reject) => {
            let reqBody = {userId: rating.userId, ratingCriterionId: rating.ratingCriterionId, comment: rating.comment, 
                dateOfRating: rating.dateofRating.toLocaleString()
            } as RegisterCommentRatingRequestBody;
            axios.post<RegisterCommentRatingResponseBody>(`${this.url}/new/comment`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerDocumentRating(rating: DocumentRating): Promise<RegisterDocumentRatingResponseBody>{
        return new Promise<RegisterDocumentRatingResponseBody>((resolve, reject) => {
            let reqBody = {userId: rating.userId, ratingCriterionId: rating.ratingCriterionId, documentName: rating.documentName,
                documentData: rating.documentData.toString('base64'), 
                dateOfRating: rating.dateofRating.toLocaleString()
            } as RegisterDocumentRatingRequestBody;
            axios.post<RegisterDocumentRatingResponseBody>(`${this.url}/new/document`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public registerTextValueRating(rating: TextValueRating): Promise<RegisterTextValueRatingResponseBody>{
        return new Promise<RegisterCommentRatingResponseBody>((resolve, reject) => {
            let reqBody = {userId: rating.userId, ratingCriterionId: rating.ratingCriterionId, textValueInt: rating.textValueInt, 
                dateOfRating: rating.dateofRating.toLocaleString()
            } as RegisterTextValueRatingRequestBody;
            axios.post<RegisterTextValueRatingResponseBody>(`${this.url}/new/textvalue`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public deleteRating(ratingId: number): Promise<DeleteRatingResponseBody>{
        return new Promise<DeleteRatingResponseBody>((resolve, reject) => {
            axios.delete<DeleteRatingResponseBody>(`${this.url}/${ratingId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getNumericRatings(clientId: number, includeDelete: boolean): Promise<GetNumberRatingsResponseBody>{
        return new Promise<GetNumberRatingsResponseBody>((resolve, reject) => {
            let includeIdentifier = includeDelete ? 1 : 0;
            axios.get<GetNumberRatingsResponseBody>(`${this.url}/numberrange/${clientId}/${includeIdentifier}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllNumericRatingsByCriterion(criterionId: number): Promise<GetAllNumberRatingsByCriterionResponseBody>{
        return new Promise<GetAllNumberRatingsByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllNumericRatingsByCriterionRequestBody;
            axios.post<GetAllNumberRatingsByCriterionResponseBody>(`${this.url}/bycriterion/numberrange/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllNumericRatingsByCriterionExtended(criterionId: number): Promise<GetAllNumberRatingsByCriterionExtendedResponseBody>{
        return new Promise<GetAllNumberRatingsByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllNumericRatingsByCriterionExtendedRequestBody;
            axios.post<GetAllNumberRatingsByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/numberrange/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllNumericRatingsAvgByCriterionExtended(criterionId: number): Promise<GetAllNumericRatingsAvgByCriterionExtendedResponseBody>{
        return new Promise<GetAllNumericRatingsAvgByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllNumericRatingsAvgByCriterionExtendedRequestBody;
            axios.post<GetAllNumericRatingsAvgByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/numberrange/all/avg`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })   
    }

    public getFloatRatings(clientId: number, includeDelete: boolean): Promise<GetFloatRatingsResponseBody>{
        return new Promise<GetFloatRatingsResponseBody>((resolve, reject) => {
            let includeIdentifier = includeDelete ? 1 : 0;
            axios.get<GetFloatRatingsResponseBody>(`${this.url}/floatrange/${clientId}/${includeIdentifier}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllFloatRatingsByCriterion(criterionId: number): Promise<GetAllFloatRatingsByCriterionResponseBody>{
        return new Promise<GetAllFloatRatingsByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllFloatRatingsByCriterionRequestBody;
            axios.post<GetAllFloatRatingsByCriterionResponseBody>(`${this.url}/bycriterion/floatrange/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllFloatRatingsByCriterionExtended(criterionId: number): Promise<GetAllFloatRatingsByCriterionExtendedResponseBody>{
        return new Promise<GetAllFloatRatingsByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllFloatRatingsByCriterionExtendedRequestBody;
            axios.post<GetAllFloatRatingsByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/floatrange/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllFloatRatingsAvgByCriterionExtended(criterionId: number): Promise<GetAllFloatRatingsAvgByCriterionExtendedResponseBody>{
        return new Promise<GetAllFloatRatingsAvgByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllFloatRatingsAvgByCriterionExtendedRequestBody;
            axios.post<GetAllFloatRatingsAvgByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/floatrange/all/avg`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getCommentRatings(clientId: number, includeDelete: boolean): Promise<GetCommentRatingsResponseBody>{
        return new Promise<GetCommentRatingsResponseBody>((resolve, reject) => {
            let includeIdentifier = includeDelete ? 1 : 0;
            axios.get<GetCommentRatingsResponseBody>(`${this.url}/comment/${clientId}/${includeIdentifier}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllCommentRatingsByCriterion(criterionId: number): Promise<GetAllCommentRatingsByCriterionResponseBody>{
        return new Promise<GetAllCommentRatingsByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllCommentRatingsByCriterionRequestBody;
            axios.post<GetAllCommentRatingsByCriterionResponseBody>(`${this.url}/bycriterion/comment/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getAllCommentRatingsByCriterionExtended(criterionId: number): Promise<GetAllCommentRatingsByCriterionExtendedResponseBody>{
        return new Promise<GetAllCommentRatingsByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllCommentRatingsByCriterionExtendedRequestBody;
            axios.post<GetAllCommentRatingsByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/comment/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getDocumentRatings(clientId: number, includeDelete: boolean): Promise<GetDocumentRatingsResponseBody>{
        return new Promise<GetDocumentRatingsResponseBody>((resolve, reject) => {
            let includeIdentifier = includeDelete ? 1 : 0;
            axios.get<GetDocumentRatingsResponseBody>(`${this.url}/document/${clientId}/${includeIdentifier}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllDocumentRatingsByCriterion(criterionId: number): Promise<GetAllDocumentRatingsByCriterionResponseBody>{
        return new Promise<GetAllDocumentRatingsByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllDocumentRatingsByCriterionRequestBody;
            axios.post<GetAllDocumentRatingsByCriterionResponseBody>(`${this.url}/bycriterion/document/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getAllDocumentRatingsByCriterionExtended(criterionId: number): Promise<GetAllDocumentRatingsByCriterionExtendedResponseBody>{
        return new Promise<GetAllDocumentRatingsByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllDocumentRatingsByCriterionExtendedRequestBody;
            axios.post<GetAllDocumentRatingsByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/document/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getTextValueRatings(clientId: number, includeDelete: boolean): Promise<GetTextValueRatingsResponseBody>{
        return new Promise<GetTextValueRatingsResponseBody>((resolve, reject) => {
            let includeIdentifier = includeDelete ? 1 : 0;
            axios.get<GetTextValueRatingsResponseBody>(`${this.url}/textvalue/${clientId}/${includeIdentifier}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    } 

    public getAllTextRatingsByCriterion(criterionId: number): Promise<GetAllTextRatingsByCriterionResponseBody>{
        return new Promise<GetAllTextRatingsByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllTextRatingsByCriterionRequestBody;
            axios.post<GetAllTextRatingsByCriterionResponseBody>(`${this.url}/bycriterion/textvalue/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getAllTextRatingsByCriterionExtended(criterionId: number): Promise<GetAllTextRatingsByCriterionExtendedResponseBody>{
        return new Promise<GetAllTextRatingsByCriterionExtendedResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetAllTextRatingsByCriterionExtendedRequestBody;
            axios.post<GetAllTextRatingsByCriterionExtendedResponseBody>(`${this.url}/bycriterion/extended/textvalue/all`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getMostCommonTextRatingByCriterionExtended(criterionId: number): Promise<GetMostCommonTextRatingFromAllByCriterionResponseBody>{
        return new Promise<GetMostCommonTextRatingFromAllByCriterionResponseBody>((resolve, reject) => {
            let reqBody = {criterionId: criterionId} as GetMostCommonTextRatingFromAllByCriterionRequestBody;
            axios.post<GetMostCommonTextRatingFromAllByCriterionResponseBody>(`${this.url}/bycriterion/extended/textvalue/all/mostcommon`, reqBody)
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