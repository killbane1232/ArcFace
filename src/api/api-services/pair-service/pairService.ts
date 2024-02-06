import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    PairResponse
} from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const pairServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _PairService {
    async get(): Promise<PairResponse> {
        const response: AxiosResponse = await pairServiceInstance.get('/pair');

        return response.data;
    }
}

const PairService = new _PairService();

export default PairService;