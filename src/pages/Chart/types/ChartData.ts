import { ChartDataItem } from "./ChartDataItem";

export interface ChartData {
  type : string,
  name : string,
  color : string | null,
  id : number,
  data : Array<ChartDataItem>
}