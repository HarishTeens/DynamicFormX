/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Post } from "../../../../api/request";
import { IRepeaterTagData } from "../types/IRepeaterTagData";
import { getInputDefaultValue } from "./getInputDefaultValue";
import { setInputValue } from "./setInputValue";
import { IInputField, IInputFieldState, IInputFieldsState } from "../types/IInputFieldsState";
import { ITableMapState } from "../types/IUseTableFields";
import { IFormCategoryData } from "../types/IFormCategoryData";
import { copyNestedObj } from "~/utils/utils";

export const TOP_LEVEL_TAG = "Applicant";

export type IGetRepeaterDataForInput = (
  input: IInputField,
  repeaterData?: Array<IRepeaterTagData>
) => IRepeaterTagData | null;

export const getRepeaterDataForInput: IGetRepeaterDataForInput = (
  input,
  repeaterData
) => {
  if (!repeaterData) return null;

  return repeaterData.filter(({ options }) =>
    options.map(({ key }) => key).includes(input.id)
  )[0];
};

export type IFormatTableFieldsToState = (
  fields?: Array<IInputField>,
  formCategoryData?: IFormCategoryData
) => Promise<ITableMapState>;

export const formatTableFieldsToState: IFormatTableFieldsToState = async (
  fields,
) => {
  if (!fields) return {};
  /**
   * Starting object that is populated and then
   * returned at the end
   */
  const tableMapState = {} as ITableMapState;
  const columnsMap = {} as Record<string, boolean>;

  fields.forEach(inputField => {
    const inputValue = inputField.value as object;
    if (inputValue && Object.keys(inputValue).length > 0) {
      Object.keys(inputValue).forEach(col => columnsMap[col] = true)
    }
  })
  const columnsList = Object.keys(columnsMap);
  if (columnsList.length === 0) columnsList.push("");
  columnsList.forEach(col => tableMapState[col] = {} as IInputFieldsState)

  fields.forEach(async (inputField) => {
    checkAndAddInput(tableMapState, inputField, columnsList);
  });

  return tableMapState;
};

/**
 * - takes in the parent input element object
 * - checks if current input belongs to a repeater
 * - if yes, adds the input under the repeater obj
 * - if not, adds the input under the parent obj
 */
export const checkAndAddInput = (
  newMapState: ITableMapState,
  inputField: IInputField,
  columns: Array<string>
) => {
  const inputFieldStateProperties = {
    isError: false,
    errorMsg: "",
    inputValue: getInputDefaultValue(inputField),
    hide: inputField.visibilityField === "hide" ? true : false,
  };
  /** Preload existing values if present(view/edit) */
  const existingValue = setInputValue(inputField);
  if (existingValue !== null && existingValue !== undefined) {
    inputFieldStateProperties.inputValue = existingValue;
  }

  // Set options to empty array if not present
  if (!inputField.options) { inputField.options = [] }
  if (inputField.selectoption) { inputField.required = true }

  console.log("checkAddinput columns", columns);
  columns.forEach(col => {
    newMapState[col][inputField.id as keyof IInputFieldsState] = {
      ...inputField,
      ...inputFieldStateProperties
    };
    const tempInputState = copyNestedObj(newMapState[col][inputField.id as keyof IInputFieldsState]);
    console.log("before setinpput", copyNestedObj(tempInputState), col);
    tempInputState.value = tempInputState.value[col];
    const inputValue = setInputValue(tempInputState);
    (newMapState[col][inputField.id as keyof IInputFieldsState] as IInputFieldState).inputValue = inputValue;
  })

  return newMapState;
};
