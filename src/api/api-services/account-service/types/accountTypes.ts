import { Account } from "@/api";
import { BaseResponse } from "../../../utils/baseResponse";

export interface AccountResponse extends BaseResponse {
    data: Account[];
}
