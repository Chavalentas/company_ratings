import { Client } from "../models/business_logic/client.model";
import { RegisterClientResponseBody } from "../models/response_bodies/clients_response_bodies/register_client_response_body.model";
import axios from "axios";
import { ErrorMessageResponseBody } from "../models/response_bodies/users_response_bodies/error_message_response_body.model";
import { RegisterClientRequestBody } from "../models/request_bodies/clients_request_bodies/register_client_request_body.model";
import { UpdateClientResponseBody } from "../models/response_bodies/clients_response_bodies/update_client_response_body.model";
import { UpdateClientRequestBody } from "../models/request_bodies/clients_request_bodies/update_client_request_body.model";
import { DeleteClientResponseBody } from "../models/response_bodies/clients_response_bodies/delete_client_response_body.model";
import { DeleteClientsForUserResponseBody } from "../models/response_bodies/clients_response_bodies/delete_clients_for_user_response_body.model";
import { GetClientResponseBody } from "../models/response_bodies/clients_response_bodies/get_client_response_body.model";
import { GetClientsByUserIdResponseBody } from "../models/response_bodies/clients_response_bodies/get_clients_by_userid_response_body.model";
import { SearchForClientsResponseBody } from "../models/response_bodies/clients_response_bodies/search_clients_response_body.model";
import { SearchForClientsRequestBody } from "../models/request_bodies/clients_request_bodies/search_for_clients_request_body.model";
import { Helper } from "../models/business_logic/helper.model";

export class ClientsService{
    url: string;

    constructor(clientsUrl: string){
        this.url = "";
        this.setUrl(clientsUrl);
    }

    public registerClient(client: Client): Promise<RegisterClientResponseBody>{
        return new Promise<RegisterClientResponseBody>((resolve, reject) => {
            let reqBody = {name: client.name, street: client.street, postalCode: client.postalCode, country: client.country, city: client.city, userId: client.userId} as RegisterClientRequestBody;
            axios.post<RegisterClientResponseBody>(`${this.url}/register`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public updateClient(client: Client, clientId: number): Promise<UpdateClientResponseBody>{
        return new Promise<UpdateClientResponseBody>((resolve, reject) => {
            if (client.id != clientId){
                reject("The client.id and clientId do not match!");
                return;
            }

            let reqBody = {name: client.name, city: client.city, country: client.country, street: client.street, 
                clientId: clientId, userId: client.userId, postalCode: client.postalCode} as UpdateClientRequestBody;
            axios.put<UpdateClientResponseBody>(`${this.url}/${clientId}`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteClient(clientId: number): Promise<DeleteClientResponseBody>{
        return new Promise<DeleteClientResponseBody>((resolve, reject) => {
            axios.delete<DeleteClientResponseBody>(`${this.url}/${clientId}`)
            .then((response => {
                resolve(response.data);
            }))
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public deleteClientsForUser(userId: number): Promise<DeleteClientsForUserResponseBody>{
        return new Promise<DeleteClientsForUserResponseBody>((resolve, reject) => {
            axios.delete<DeleteClientsForUserResponseBody>(`${this.url}/deleteall/${userId}`)
            .then((response => {
                resolve(response.data);
            }))
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getClientInformation(clientId: number): Promise<GetClientResponseBody>{
        return new Promise<GetClientResponseBody>((resolve, reject) => {
            axios.get<GetClientResponseBody>(`${this.url}/${clientId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getClientsByUserId(userId: number): Promise<GetClientsByUserIdResponseBody>{
        return new Promise<GetClientsByUserIdResponseBody>((resolve, reject) => {
            axios.get<GetClientsByUserIdResponseBody>(`${this.url}/byuser/${userId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public searchForClients(searchPattern: string): Promise<SearchForClientsResponseBody>{
        return new Promise<SearchForClientsResponseBody>((resolve, reject) => {
            let patternModified = Helper.normalize(searchPattern);
            let requestBody = {searchExpression: patternModified} as SearchForClientsRequestBody;

            axios.post<SearchForClientsResponseBody>(`${this.url}/byclient/search`, requestBody)
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