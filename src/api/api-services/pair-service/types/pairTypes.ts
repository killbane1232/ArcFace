import { Pair } from "@/api";
import { BaseResponse } from "@/api/utils/baseResponse";

export interface PairResponse extends BaseResponse {
    data: Pair[];
}
