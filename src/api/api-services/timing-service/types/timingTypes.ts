import { Timing } from "@/api";
import { BaseResponse } from "@/api/utils/baseResponse";

export interface TimingResponse extends BaseResponse {
    data: Timing[];
}
