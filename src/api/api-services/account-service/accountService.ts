import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    AccountResponse
} from "./types";
import { Account } from "@/api";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _AccountService {
    async get(): Promise<AccountResponse> {
        const response: AxiosResponse = await userServiceInstance.get('/account');

        return response.data;
    }
    async post(body: Account): Promise<AccountResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/account', body);

        return response.data;
    }
    async patch(body: Account): Promise<AccountResponse> {
        const response: AxiosResponse = await userServiceInstance.patch('/account', body);

        return response.data;
    }
    async delete(body: number): Promise<AccountResponse> {
        const response: AxiosResponse = await userServiceInstance.delete('/account/' + body);

        return response.data;
    }
}

const AccountService = new _AccountService();

export default AccountService;