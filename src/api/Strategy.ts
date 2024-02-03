import { StrategyIndicator } from "./StrategyIndicator";

export interface Strategy {
  id: number | null;
  name: string | null;
  isPublic: boolean | null;
  pairId: number | null;
  timingId: number | null;
  isLong: boolean | null;
  isShort: boolean | null;
  leverage: number | null;
  strategyIndicators: StrategyIndicator[];
}