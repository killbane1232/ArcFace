import { Indicator } from "./Indicator";
import { InputField } from "./InputField";

export interface StrategyIndicator {
  id: number;
  strategyId: number;
  indicatorId: number;
  indicator: Indicator;
  isExit: boolean;
  name: string;
  inputFields: Array<InputField>;
}