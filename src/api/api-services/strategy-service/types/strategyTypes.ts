import { Strategy } from "@/api/Strategy";
import { BaseResponse } from "../../../utils/baseResponse";

export interface StrategyResponse extends BaseResponse {
    data: Strategy[];
}
