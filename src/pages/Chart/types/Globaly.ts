import { Marker } from "./Marker";

export interface Globaly {
  seriesX : Array<Array<string | number | Date >>,
    markers : Marker,
    seriesNames: Array<string>,
      yLabelFormatters: Array<Function>
}