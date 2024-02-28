import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    CandleResponse, CandleRequest
} from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const userServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _CandleService {
    async get(body : CandleRequest): Promise<CandleResponse> {
        const response: AxiosResponse = await userServiceInstance.post('/candles', body);

        return response.data;
    }
}

const CandleService = new _CandleService();

export default CandleService;