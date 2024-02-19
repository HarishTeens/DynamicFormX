/* eslint-disable no-param-reassign */
import {
  IRenderableValue,
} from "./types";
  

  export function getRenderableValue(
    value: IRenderableValue,
    component: React.ReactElement
  ): IRenderableValue {
    return typeof value === ("string" || "number") ? component : value;
  }
  