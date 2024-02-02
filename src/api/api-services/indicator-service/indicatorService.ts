import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    IndicatorResponse
} from "./types";
import { StrategyIndicator } from "@/api/StrategyIndicator";
import { BaseResponse } from "@/api/utils/baseResponse";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const indicatorServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _IndicatorService {
    async get(): Promise<IndicatorResponse> {
        const response: AxiosResponse = await indicatorServiceInstance.get('/indicator');

        return response.data;
    }
    async add(body: StrategyIndicator): Promise<BaseResponse> {
        const response: AxiosResponse = await indicatorServiceInstance.post('/indicator', body);

        return response.data;
    }
    async delete(body: StrategyIndicator): Promise<BaseResponse> {
        const response: AxiosResponse = await indicatorServiceInstance.delete('/indicator/' + body.Id);

        return response.data;
    }
}

const IndicatorService = new _IndicatorService();

export default IndicatorService;