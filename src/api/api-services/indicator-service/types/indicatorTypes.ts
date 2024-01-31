import { Indicator } from "@/api/Indicator";
import { BaseResponse } from "@/api/utils/baseResponse";

export interface IndicatorResponse extends BaseResponse {
    data: Indicator[];
}
