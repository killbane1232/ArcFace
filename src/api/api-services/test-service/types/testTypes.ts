import { Timing } from "@/api";
import { BaseResponse } from "@/api/utils/baseResponse";

export interface TestResponse extends BaseResponse {
    data: BlobPart[];
}
