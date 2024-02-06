import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    TestResponse
} from "./types";
import { Strategy } from "@/api";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const testServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _TestService {
    async get(strat: Strategy): Promise<Blob> {
        const response: AxiosResponse = await testServiceInstance.post('/test', strat);

        return new Blob((response.data as TestResponse).data);
    }
}

const TestService = new _TestService();

export default TestService;