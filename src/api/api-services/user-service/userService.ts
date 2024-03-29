import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    LoginRequest
} from "./types";
import { BaseResponse } from "@/api/utils/baseResponse";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _UserService {
    async login(body: LoginRequest): Promise<BaseResponse> {
        const response: AxiosResponse = await userServiceInstance.post('user/login', body);
        
        return response.data;
    }
    async logout(): Promise<BaseResponse> {
        const response: AxiosResponse = await userServiceInstance.post('user/logout');

        return response.data;
    }
}

const UserService = new _UserService();

export default UserService;