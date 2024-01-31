import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    StrategyResponse
} from "./types";
import { Strategy } from "@/api/Strategy";

const API_URL = import.meta.env.VITE_API_USERS_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _StrategyService {
    async getAll(): Promise<StrategyResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/strategy');

        return response.data;
    }
    async get(body: Strategy): Promise<StrategyResponse> {
        const response: AxiosResponse = await userServiceInstance.get('/strategy/' + body.Id);

        return response.data;
    }
    async post(body: Strategy): Promise<StrategyResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/strategy', body);

        return response.data;
    }
    async patch(body: Strategy): Promise<StrategyResponse> {
        const response: AxiosResponse = await userServiceInstance.patch('/strategy', body);

        return response.data;
    }
    async delete(body: Strategy): Promise<StrategyResponse> {
        const response: AxiosResponse = await userServiceInstance.delete('/strategy/' + body.Id);

        return response.data;
    }
}

const StrategyService = new _StrategyService();

export default StrategyService;