import { Indicator } from "./Indicator";

export interface StrategyIndicator {
  Id: number;
  StrategyId: number;
  IndicatorId: number;
  Indicator: Indicator;
  IsExit: boolean;
}