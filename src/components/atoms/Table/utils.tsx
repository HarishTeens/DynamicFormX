/* eslint-disable no-param-reassign */
import {
  IRenderableValue,
  ITableCell,
  ITableCellFilled,
  ITableRow,
  ITableRowFilled,
} from "./types";

export function getValue<T>(
  field: ITableCellFilled<T>,
  item: T
): IRenderableValue {
  const { key, value } = field;
  const val = item[key];
  return value(val, item);
}

export function getDefaultValue(
  value: IRenderableValue,
  defaultEmptyValue: IRenderableValue
) {
  if (value === "" || value === null || value === undefined)
    return defaultEmptyValue;
  return value;
}

export function filterFields<T>(field: ITableCellFilled<T>): boolean {
  return typeof field.condition === "boolean"
    ? field.condition
    : field.condition();
}

export function truthyCondition() {
  return true;
}

export function returnValue<T>(val: T): string {
  return val as unknown as string;
}

export function transformKey<T>(val: string) {
  return val.toLocaleLowerCase().split(" ").join("_") as keyof T;
}

export function transformFields<T>(field: ITableCell<T>): ITableCellFilled<T> {
  if (typeof field === "string") {
    return {
      title: field as string,
      condition: truthyCondition,
      key: transformKey(field as string),
      value: returnValue,
    };
  }

  if (!field.key && typeof field.title === "string") {
    field.key = transformKey(field.title);
  }

  if (!field.condition) {
    field.condition = truthyCondition;
  }

  if (!field.value) {
    field.value = returnValue;
  }

  return field as ITableCellFilled<T>;
}

export function getFields<T>(fields: ITableRow<T>): ITableRowFilled<T> {
  return fields
    .map((field) => transformFields(field))
    .filter((field) => filterFields(field));
}

export function getRenderableValue(
  value: IRenderableValue,
  component: React.ReactElement
): IRenderableValue {
  return typeof value === ("string" || "number") ? component : value;
}
