import { StrategyIndicator } from "./StrategyIndicator";

export interface Strategy {
  id: number;
  name: string;
  isPublic: boolean;
  pairId: number;
  timingId: number;
  isLong: boolean;
  isShort: boolean;
  leverage: number;
  strategyIndicators: StrategyIndicator[];
}