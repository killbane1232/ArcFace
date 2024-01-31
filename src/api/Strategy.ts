import { StrategyIndicator } from "./StrategyIndicator";

export interface Strategy {
  Id: number;
  Name: string;
  IsPublic: boolean;
  PairId: number;
  TimingId: number;
  IsLong: boolean;
  IsShort: boolean;
  Leverage: number;
  StrategyIndicators: StrategyIndicator[];
}