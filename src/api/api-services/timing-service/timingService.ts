import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    TimingResponse
} from "./types";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const timingServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _TimingService {
    async get(): Promise<TimingResponse> {
        const response: AxiosResponse = await timingServiceInstance.get('/timing');

        return response.data;
    }
}

const TimingService = new _TimingService();

export default TimingService;