import {AxiosInstance, AxiosResponse} from "axios";
import createApiInstance from "@/api/utils/createApiInstance";
import {
    TestResponse
} from "./types";
import { Strategy } from "@/api";
import { decode } from 'base64-ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const testServiceInstance: AxiosInstance = createApiInstance(API_URL);

class _TestService {
    async get(strat: Strategy): Promise<File> {
        const response: AxiosResponse = await testServiceInstance.post('/test', strat);
        const str = decode((response.data as TestResponse).data);
        var buffer : ArrayBuffer = new ArrayBuffer(str.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < str.length; i++) {
            view[i] = str[i];
        }
        return new File([buffer], 'Hamlet.csv');
    }
    async patch(strat: Strategy): Promise<File> {
        const response: AxiosResponse = await testServiceInstance.patch('/test', strat);
        const str = decode((response.data as TestResponse).data);
        var buffer : ArrayBuffer = new ArrayBuffer(str.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < str.length; i++) {
            view[i] = str[i];
        }
        return new File([buffer], 'Hamlet.csv');
    }
}

const TestService = new _TestService();

export default TestService;