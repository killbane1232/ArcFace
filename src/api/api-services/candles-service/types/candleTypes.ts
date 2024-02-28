import { Candle, IndicatorData } from "@/api";
import { BaseResponse } from "../../../utils/baseResponse";

export interface CandleResponse extends BaseResponse {
    data: Candle[];
    onChart: IndicatorData[];
    subChart: IndicatorData[];
}

export interface CandleRequest {
    strategyId : number;
    date : Date | null;
    count : number | null;
}
