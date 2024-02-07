import { BaseResponse } from "@/api/utils/baseResponse";

export interface TestResponse extends BaseResponse {
    data: Array<number>;
}
