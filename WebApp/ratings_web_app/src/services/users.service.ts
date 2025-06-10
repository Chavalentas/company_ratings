import { User } from "../models/business_logic/user.model";
import axios from "axios";
import { RegisterUserRequestBody } from "../models/request_bodies/users_request_bodies/register_user_request_body.model";
import { RegisterUserResponseBody } from "../models/response_bodies/users_response_bodies/register_user_response_body.model";
import { ErrorMessageResponseBody } from "../models/response_bodies/users_response_bodies/error_message_response_body.model";
import { LoginUserResponseBody } from "../models/response_bodies/users_response_bodies/login_user_response_body.model";
import { LoginUserRequestBody } from "../models/request_bodies/users_request_bodies/login_user_request_body.model";
import { VerifyUserRequestBody } from "../models/request_bodies/users_request_bodies/verify_user_request_body.model";
import { VerifyUserResponseBody } from "../models/response_bodies/users_response_bodies/verify_user_response_body.model";
import { UpdateUserRequestBody } from "../models/request_bodies/users_request_bodies/update_user_request_body.model";
import { UpdateUserResponseBody } from "../models/response_bodies/users_response_bodies/update_user_response_body.model";
import { UpdatePasswordRequestBody } from "../models/request_bodies/users_request_bodies/update_password_request_body.model";
import { UpdatePasswordResponseBody } from "../models/response_bodies/users_response_bodies/update_password_response_body.model";
import { DeleteUserResponseBody } from "../models/response_bodies/users_response_bodies/delete_user_response_body.model";
import { GetUserResponseBody } from "../models/response_bodies/users_response_bodies/get_user_response_body.model";

export class UsersService{
    url: string;

    constructor(usersUrl: string){
        this.url = "";
        this.setUrl(usersUrl);
    }

    public registerUser(user: User): Promise<RegisterUserResponseBody>{
        return new Promise<RegisterUserResponseBody>((resolve, reject) => {
            let reqBody = {userName: user.userName, password: user.password, firstName: user.firstName, lastName: user.lastName} as RegisterUserRequestBody;
            axios.post<RegisterUserResponseBody>(`${this.url}/register`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public loginUser(username: string, password: string): Promise<LoginUserResponseBody>{
        return new Promise<LoginUserResponseBody>((resolve, reject) => {
            let reqBody = {userName: username, password: password} as LoginUserRequestBody;
            axios.post<LoginUserResponseBody>(`${this.url}/login`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public verifyUser(token: string): Promise<VerifyUserResponseBody>{
        return new Promise<VerifyUserResponseBody>((resolve, reject) => {
            let reqBody = {token: token} as VerifyUserRequestBody;
            axios.post<VerifyUserResponseBody>(`${this.url}/userid`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public updateUser(user: User, userId: number): Promise<UpdateUserResponseBody>{
        return new Promise<UpdateUserResponseBody>((resolve, reject) => {
            if (user.id != userId){
                reject("The user.id and userId do not match!");
                return;
            }

            let reqBody = {userId: userId, userName: user.userName, firstName: user.firstName, lastName: user.lastName} as UpdateUserRequestBody;
            axios.put<UpdateUserResponseBody>(`${this.url}/${userId}`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public updatePassword(userId: number, newPassword: string): Promise<UpdatePasswordResponseBody>{
        return new Promise<UpdatePasswordResponseBody>((resolve, reject) => {
            let reqBody = {userId: userId, password: newPassword} as UpdatePasswordRequestBody;
            axios.put<UpdatePasswordResponseBody>(`${this.url}/pwd/${userId}`, reqBody)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data  as ErrorMessageResponseBody);
            })
        })
    }

    public deleteUser(userId: number): Promise<DeleteUserResponseBody>{
        return new Promise<DeleteUserResponseBody>((resolve, reject) => {
            axios.delete<DeleteUserResponseBody>(`${this.url}/${userId}`)
            .then((response => {
                resolve(response.data);
            }))
            .catch((error) => {
                reject(error.response.data as ErrorMessageResponseBody);
            })
        })
    }

    public getUser(userId: number): Promise<User>{
        return new Promise<User>((resolve, reject) => {
            axios.get<GetUserResponseBody>(`${this.url}/${userId}`)
            .then((response) => {
                let user = {id: response.data.id, userName: response.data.userName, password: response.data.password, 
                    firstName: response.data.firstName, lastName: response.data.lastName
                } as User;
                resolve(user);
            }).catch((error) => {
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