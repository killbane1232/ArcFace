export interface IndicatorData {
  name : string,
  type : string,
  values : Array<IndicatorDataItem>,
  lineNames : Array<string>
}

export interface IndicatorDataItem {
  timeStamp : Date,
  values : Array<number>,
}