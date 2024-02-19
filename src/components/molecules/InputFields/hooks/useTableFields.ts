import { useState } from "react";
import { ICheckRequiredFields, IGetTableValues, IHandleSetValues, IInputFieldStateValue, ITableHandleInputBlur, ITableHandleSetKey, ITableMapState, IUseTableFieldsHook } from "../types/IUseTableFields";
import { formatTableFieldsToState } from "../utils/formatTableFieldsToState";
import { copyNestedObj } from "~/utils/utils";
import { getInputValue } from "../utils/getInputValue";
import { IInputFieldState, IInputFieldsState } from "../types/IInputFieldsState";
import { ISelectOnChange, ISelectValue } from "~/components/atoms/Select/types";
import { IField } from "~/components/atoms/TableCategory/types";
import { IRadioValue } from "~/components/atoms/Radio/types";
import { EMAIL_REGEX } from "~/constants/regex";
import { IFileUploadResponse } from "~/components/atoms/UploadInput";

export const useTableFields: IUseTableFieldsHook = () => {
  const [values, setValues] = useState<ITableMapState>({});

  const handleSetValues: IHandleSetValues = async (inputFields, data) => {
    if (Array.isArray(inputFields)) {
      const inputFieldsState = await formatTableFieldsToState(
        inputFields,
        data?.formCategoryData
      );
      setValues(inputFieldsState);
    } else {
      setValues(inputFields);
    }
  };
  const getValues: IGetTableValues = () => {
    const inputValues = {} as Record<string, IInputFieldStateValue>;
    Object.keys(Object.values(values)[0]).forEach(field => {
      inputValues[field] = {};
    })
    Object.keys(values).forEach((colKey) => {
      Object.keys(values[colKey]).forEach((fieldKey) => {
        const inputValue = getInputValue(values[colKey][fieldKey as keyof IInputFieldsState] as IInputFieldState)
        inputValues[fieldKey] = {
          ...(inputValues[fieldKey] as object),
          [colKey]: inputValue,
        };
      });
    });

    return inputValues;
  };
  const checkRequiredFields: ICheckRequiredFields = (setErrors = true) => {
    let isRequiredCheck = true;
    Object.keys(values).forEach((colKey) => {
      Object.keys(values[colKey]).forEach((fieldKey) => {
        const input = values[colKey][fieldKey as keyof IInputFieldsState] as IInputFieldState;
        if (input.required) {
          if (!input.inputValue) {
            isRequiredCheck = false;
          }
        }
        if (input.required && !input.hide) {
          console.log("i am required", input);
          if (getInputValue(input as IInputFieldState)) {
            // condition for updating error message after submit
            setErrors && (input?.type == 'radio' || input?.type == 'radio-buttons') && handleErrorMessage(colKey, input?.id, false, "")
          } else {
            console.log("i violated ", input);
            setErrors && handleErrorMessage(colKey, input?.id, true, `${input?.name} is required`)
            isRequiredCheck = false;
          }
        }
      });
    });
    return isRequiredCheck;
  };
  const handleInputChange = (
    colKey: IField["title"]
  ) => {

    return (inputFieldState: IInputFieldState) => {
      const { id, type } = inputFieldState;

      const handleCommonFunctionCalls = (
        inputValue: IInputFieldState["inputValue"]
      ) => {
        handleTableSetKey(colKey)(id, "inputValue", inputValue);

        // handleDependencyCondition(
        //   inputFieldState,
        //   id,
        //   inputValue,
        //   values[colKey],
        //   handleSetKey
        // );
      };

      switch (type) {
        case "select":
        case "dropdown":
          return ((selectValue: ISelectValue) => {
            // handleRestUrlDependencyCondition(
            //   inputFieldState,
            //   selectValue,
            //   values[colKey],
            //   handleSetKey
            // );
            handleCommonFunctionCalls(selectValue);
          }) as unknown as ISelectOnChange;

        case "checkbox":
          return () => {
            handleCommonFunctionCalls(
              !(values[colKey][id as keyof IInputFieldsState] as IInputFieldState).inputValue
            );
          };

        case "radio":
        case "radio-buttons":
          return (value: IRadioValue) => {
            handleCommonFunctionCalls(value);
          };

        case "number":
        case "integer":
        case "decimal":
          return (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = Number(e.target.value) ?? 0;
            if (type === "decimal" || type === "integer") {
              handleCommonFunctionCalls(inputValue);
            }
          };
        case "upload":
          return (files: IFileUploadResponse[]) => {
            handleCommonFunctionCalls(files);
          };
        case "multi-line-text":
          return (value: string) => {
            handleCommonFunctionCalls(value);
          };
        case "text":
        case "password":
        default:
          if (inputFieldState.colorpicker) {
            return (value: string) => {
              handleCommonFunctionCalls(value);
            };
          }
          return (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value ?? '';
            handleCommonFunctionCalls(inputValue);
          };
      }
    }
  };

  const handleTableSetKey: ITableHandleSetKey = (colKey) => {
    return (id, key, value) => {
      setValues((current) => ({
        ...current,
        [colKey]: {
          ...current[colKey],
          [id]: {
            ...current[colKey][id as keyof IInputFieldsState],
            [key]: value,
          },
        }
      } as ITableMapState));
    }
  };

  const handleErrorMessage = (
    colKey: string,
    id: string,
    show: boolean,
    errorMsg: string | undefined | null,
  ) => {
    // If no error
    if (!show && !errorMsg) {
      handleTableSetKey(colKey)(id, "isError", false);
      handleTableSetKey(colKey)(
        id,
        "errorMsg",
        ""
      );
    }
    handleTableSetKey(colKey)(id, "isError", show);
    handleTableSetKey(colKey)(
      id,
      "errorMsg",
      errorMsg !== undefined || null ? (errorMsg as string) : "Invalid"
    );
  };

  const handleInputBlur: ITableHandleInputBlur = (colKey) => {
    return (inputFieldState) => {
      const { id, type } = inputFieldState;

      const handleErrorMessage = (
        id: string,
        show: boolean,
        errorMsg: string | undefined | null
      ) => {
        // If no error
        if (!show && !errorMsg) {
          handleTableSetKey(colKey)(id, "isError", false);
          handleTableSetKey(colKey)(
            id,
            "errorMsg",
            ""
          );
        }
        handleTableSetKey(colKey)(id, "isError", show);
        handleTableSetKey(colKey)(
          id,
          "errorMsg",
          errorMsg !== undefined || null ? (errorMsg as string) : "Invalid"
        );
      };

      switch (type) {
        case "email":
          return (e: React.FocusEvent<HTMLInputElement>) => {
            if (inputFieldState.required && !e.target.value) {
              return handleErrorMessage(
                id,
                true,
                "Field is Required"
              );
            }

            if (!e.target.value.match(EMAIL_REGEX)) {
              return handleErrorMessage(
                id,
                true,
                inputFieldState.regexerrormsg
              );
            }

            return handleErrorMessage(id, false, "");
          };

        case "select":
        case "dropdown":
          return () => {
            if (
              inputFieldState.required &&
              !(values[colKey][id as keyof IInputFieldsState] as IInputFieldState).inputValue
            ) {
              return handleErrorMessage(
                id,
                true,
                "Field is Required"
              );
            }

            return handleErrorMessage(id, false, "");
          };

        case "number":
        case "integer":
        case "decimal":
          return (e: React.FocusEvent<HTMLInputElement>) => {
            if (inputFieldState.required && !inputFieldState.inputValue) {
              return handleErrorMessage(
                id,
                true,
                "Field is Required"
              );
            }

            if (
              (inputFieldState.minvalue &&
                Number(e.target.value) < inputFieldState.minvalue) ||
              (inputFieldState.maxvalue &&
                Number(e.target.value) > inputFieldState.maxvalue)
            ) {
              return handleErrorMessage(
                id,
                true,
                inputFieldState.lengtherrormsg || inputFieldState.valueerrormsg
              );
            }
            return handleErrorMessage(id, false, "");
          };

        case "text":
        case "password":
        default:
          return (e: React.FocusEvent<HTMLInputElement>) => {
            if (inputFieldState.required && !inputFieldState.inputValue) {
              return handleErrorMessage(
                id,
                true,
                "Field is Required"
              );
            }

            if (
              (inputFieldState.min &&
                (e.target.value as string).length < inputFieldState.min) ||
              (inputFieldState.max &&
                (e.target.value as string).length > inputFieldState.max)
            ) {
              return handleErrorMessage(
                id,
                true,
                inputFieldState.lengtherrormsg || inputFieldState.valueerrormsg
              );
            }

            if (
              inputFieldState.regex &&
              !RegExp(inputFieldState.regex).test(
                inputFieldState.inputValue as string
              )
            ) {
              return handleErrorMessage(
                id,
                true,
                inputFieldState.regexerrormsg
              );
            }

            return handleErrorMessage(id, false, "");
          };
      }
    }
  };


  const handleFieldChange = (idx: number, value: string) => {
    const newValues = copyNestedObj(values) as ITableMapState;
    const colKey = Object.keys(newValues)[idx];
    newValues[value] = newValues[colKey];
    delete newValues[colKey];
    handleSetValues(newValues)
  }

  const handleCellChange = (colKey: IField["title"], fieldKey: string, value: string) => {
    const newValues = copyNestedObj(values) as ITableMapState;
    const colValues = newValues[colKey]
    const colInputValue = colValues[fieldKey as keyof IInputFieldsState] as IInputFieldState;
    colInputValue.inputValue = value;
    newValues[colKey] = colValues;
    handleSetValues(newValues)
  }

  const addColumn = () => {
    const newValues = copyNestedObj(values) as ITableMapState;
    const newCol = String(Number(Object.keys(newValues)[Object.keys(newValues).length - 1]) + 1);
    newValues[newCol] = newValues[Object.keys(newValues)[0]];
    Object.values(newValues[newCol]).forEach((field) => {
      (field as IInputFieldState).inputValue = "";
    });
    handleSetValues(newValues)
  }

  const deleteColumn = (colKey: IField["title"]) => {
    if (Object.keys(values).length === 1) return;
    const newValues = copyNestedObj(values) as ITableMapState;
    delete newValues[colKey];
    handleSetValues(newValues)
  }

  return {
    values,
    handleSetValues,
    getValues: () => getValues(values),
    checkRequiredFields: (setErrors = true) => checkRequiredFields(setErrors),
    handleInputChange,
    handleInputBlur,
    handleFieldChange,
    handleCellChange,
    addColumn,
    deleteColumn,
    handleTableSetKey
  }
}