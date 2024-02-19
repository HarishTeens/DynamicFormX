import { IFormCategoryData } from "~/components/molecules/InputFields/types/IFormCategoryData";
import { IHandleInputChange } from "~/components/molecules/InputFields/types/IUseInputFields";
import { ITableHandleInputBlur, ITableHandleSetKey, ITableMapState } from "~/components/molecules/InputFields/types/IUseTableFields";

export type IRenderableValue = string | number | React.ReactElement;

export type IField = {
  title: keyof ITableMapState;
}
export interface ITableProps {
  title?: IRenderableValue;
  values: ITableMapState;
  formCategoryData?: IFormCategoryData;
  loading?: boolean;
  defaultEmptyValue?: IRenderableValue;
  noRecordMsg?: IRenderableValue;
  isFormSubmitted?: boolean;

  tableContainerClassName?: string;
  tableClassName?: string;
  tHeadClassName?: string;
  tBodyClassName?: string;
  trClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  addColumn: () => void;
  deleteColumn: (colKey: IField["title"]) => void;
  handleCellChange: (colKey: IField["title"], fieldKey: string, value: string) => void;
  handleFieldChange: (idx: number, value: string) => void;
  handleInputChange: (colKey: IField["title"]) => IHandleInputChange;
  handleInputBlur: ITableHandleInputBlur;
  handleTableSetKey: ITableHandleSetKey;
}

export type IFieldsTableMap = IField[]
