import { Client } from "../../business_logic/client.model";

export interface GetClientsByUserIdResponseBody{
    result: Client[];
}