export type IRenderableValue = string | number | React.ReactElement;

export interface ITableCellFilledPreProps<T, K extends keyof T> {
  title: IRenderableValue;
  condition: boolean | (() => boolean);
  key: K;
  value: (value: T[K], item: T) => IRenderableValue;
}
export interface ITableCellPreProps<T, K extends keyof T> {
  title: IRenderableValue;
  condition?: boolean | (() => boolean);
  key?: K;
  value?: (
    value: T[K],
    item: T
  ) => IRenderableValue | null | undefined | boolean;
}

export type ITableCell<T> = ITableCellPreProps<T, keyof T> | string;
export type ITableCellFilled<T> = ITableCellFilledPreProps<T, keyof T>;

export type ITableRow<T> = Array<ITableCell<T>>;
export type ITableRowFilled<T> = Array<ITableCellFilled<T>>;

export type ITableRows<T> = Array<ITableRow<T>>;
export type ITableRowsFilled<T> = Array<ITableRowFilled<T>>;

export interface ITableProps<T> {
  title?: IRenderableValue;
  data: Array<T>;
  fields: ITableRow<T>;
  loading?: boolean;
  defaultEmptyValue?: IRenderableValue;
  noRecordMsg?: IRenderableValue;

  tableContainerClassName?: string;
  tableClassName?: string;
  tHeadClassName?: string;
  tBodyClassName?: string;
  trClassName?: string;
  thClassName?: string;
  tdClassName?: string;
}
