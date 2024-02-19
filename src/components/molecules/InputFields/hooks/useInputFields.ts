import { useMemo, useState } from "react";

import { EMAIL_REGEX } from "../../../../constants/regex";
import { IRadioValue } from "../../../atoms/Radio/types";
import { ICheckboxValue } from "~/components/atoms/Checkbox/types";
import { ISelectOnChange, ISelectValue } from "../../../atoms/Select/types";

import { ICheckRequiredFields2, IInputFieldState, IInputFieldsState, IInputRepeaterTagFieldState } from "../types/IInputFieldsState";
import {
  ICheckRequiredFields,
  IGetValues,
  IHandleInputBlur,
  IHandleInputChange,
  IHandleSetKey,
  IHandleSetValues,
  IRepeaterValue,
  IUseInputFieldsHook,
} from "../types/IUseInputFields";
import { formatInputFieldsToState } from "../utils/formatInputFieldsToState";
import { getInputValue } from "../utils/getInputValue";
import { handleDependencyCondition } from "../utils/handleDependencyCondition";
import { handleRestUrlDependencyCondition } from "../utils/handleRestUrlDependency";
import { handleTagsCreation } from "../utils/handleTagsCreation";
import { determineVisibility } from "../utils/determineVisibility";
import { setInputValue } from "../utils/setInputValue";
import { IFileUploadResponse } from "~/components/atoms/UploadInput";

export const useInputFields: IUseInputFieldsHook = () => {
  const [values, setValues] = useState<IInputFieldsState>({});
  const [features, setFeatures] = useState<(IInputFieldState | IInputRepeaterTagFieldState)[]>([])
  console.log("values", values)
  useMemo(() => {
    setFeatures(
      Object.values(values).filter(value => (value.type === 'feature'))
    )
  }, [values])

  const handleSetValues: IHandleSetValues = async (
    inputFields,
    data
  ) => {
    if (Array.isArray(inputFields)) {
      const inputFieldsState = await formatInputFieldsToState(
        inputFields,
        data?.repeaterData,
        data?.repeaterValues,
        data?.tagData,
        data?.tagValues
      );
      await runOnLoadConditions(inputFieldsState);
      setValues(inputFieldsState);
    } else {
      await runOnLoadConditions(inputFields as IInputFieldsState);
      setValues(inputFields as IInputFieldsState);
    }
  };

  const runOnLoadConditions = async (inputFieldsState: IInputFieldsState) => {
    console.log("runOnLoadConditions", inputFieldsState);
    // Trigger Dependency Condition and Visibility Conditions for all inputs
    Object.values(inputFieldsState).forEach(async (inputField) => {
      const _inputField = inputField as IInputFieldState;
      const localHandleSetKey: IHandleSetKey = (id, key, value) => {
        const dependentInput = inputFieldsState[(id as keyof IInputFieldsState)] as IInputFieldState;
        dependentInput[(key as (keyof IInputFieldState))] = value as never;
        dependentInput.inputValue = setInputValue(dependentInput);
      }
      determineVisibility(_inputField, inputFieldsState, localHandleSetKey);
      if (_inputField.inputValue === undefined || _inputField.inputValue === null) return;
      handleDependencyCondition(
        _inputField,
        _inputField.id,
        _inputField.inputValue,
        inputFieldsState,
        localHandleSetKey
      )
    });

    // Hydrate Rest URL Options and select values
    for (const inputField of Object.values(inputFieldsState)) {
      const handleSetKey: IHandleSetKey = (id, key, value) => {
        const dependentInput = inputFieldsState[(id as keyof IInputFieldsState)] as IInputFieldState;
        dependentInput[(key as (keyof IInputFieldState))] = value as never;
        dependentInput.inputValue = setInputValue(dependentInput);
      }
      try {
        await handleRestUrlDependencyCondition(
          inputField as IInputFieldState,
          (inputField as IInputFieldState).inputValue as ISelectValue,
          inputFieldsState,
          handleSetKey
        );
      } catch (error) {
        console.log("error with fetching RestURL ", error, inputField)
      }
    }
  }

  const handleSetKey: IHandleSetKey = (id, key, value) => {
    if (!id) return;
    setValues((current) => {
      let parentRepeaters: IInputFieldsState | IInputRepeaterTagFieldState[] = current;
      let repeater = (current[(id as keyof IInputFieldsState)] as IInputRepeaterTagFieldState);
      while (!repeater) {
        parentRepeaters = Object.values(parentRepeaters).filter(rp => rp.type == 'repeater' || rp.type == 'tags') as IInputRepeaterTagFieldState[];
        const parentRepeater = parentRepeaters.find(pR => (pR as IInputRepeaterTagFieldState).repeaterFields[id as keyof IInputFieldsState]);
        if (parentRepeater) repeater = (parentRepeater as IInputRepeaterTagFieldState).repeaterFields[id as keyof IInputFieldsState] as unknown as IInputRepeaterTagFieldState;
      }
      return {
        ...current,
        [id]: {
          ...current[(id as keyof IInputFieldsState)],
          [key]: value,
        },
      } as IInputFieldsState;
    });
  };

  const getValues: IGetValues = (values) => {
    const excludeInputs: Array<string> = ['panauthentication', 'showTemplate']
    return Object.values(values).reduce((acc, input) => {
      if ((input as IInputFieldState).hide) return acc;
      if (excludeInputs.includes(input.id)) return acc;

      if (["repeater", "tags"].includes(input.type)) {
        return {
          ...acc,
          [input.name]: Object.values(
            (input as IInputRepeaterTagFieldState).repeaterFormFields as IInputFieldsState
          ).reduce(
            (acc, curr, index) => [
              ...acc,
              {
                ...getValues(curr as IInputFieldsState),
                index: index + 1,
              },
            ],
            [] as IRepeaterValue
          ),
        };
      }

      return {
        ...acc,
        [input.id]: getInputValue(input as IInputFieldState),
      };
    }, {});
  };

  // setError = false, disable save / action buttons, 
  // setError = true, component will re render , recursively going into infinite loop
  const checkRequiredFields: ICheckRequiredFields = (setErrors, values) => {
    let isRequiredCheck = true;
    for (const input of Object.values(values)) {
      try {
        if (["repeater", "tags"].includes(input.type)) {
          const repeaterFormFields = Object.values((input as IInputRepeaterTagFieldState).repeaterFormFields as IInputFieldsState)
          for (const formField of repeaterFormFields) {
            if (formField?.checkRequiredFields) {
              const res = (formField?.checkRequiredFields as ICheckRequiredFields2)();
              if (res === false) isRequiredCheck = false
            }
          }
        } else if ((input as IInputFieldState).required && !(input as IInputFieldState).hide) {
          if (getInputValue(input as IInputFieldState)) {
            setErrors && (input?.type == 'radio' || input?.type == 'radio-buttons') && handleErrorMessage(input?.id, false, "")
          } else {
            setErrors && handleErrorMessage(input?.id, true, `${input?.name} is required`)
            isRequiredCheck = false;
          }
        }
      } catch (error) {
        console.log("error in checkRequiredFields", error, input);
      }
    }
    return isRequiredCheck;
  };

  const handleInputChange: IHandleInputChange = (
    inputFieldState: IInputFieldState
  ) => {
    const { id, type } = inputFieldState;

    const handleCommonFunctionCalls = (
      inputValue: IInputFieldState["inputValue"]
    ) => {
      // hack for visibility function to use the latest value
      inputFieldState.inputValue = inputValue;
      handleSetKey(id, "inputValue", inputValue);
      handleDependencyCondition(
        inputFieldState,
        id,
        inputValue,
        values,
        handleSetKey
      );
      determineVisibility(inputFieldState, values, handleSetKey);
    };

    switch (type) {
      case "select":
      case "dropdown":
        return ((selectValue: ISelectValue) => {
          handleRestUrlDependencyCondition(
            inputFieldState,
            selectValue,
            values,
            handleSetKey
          );
          handleCommonFunctionCalls(selectValue);
        }) as unknown as ISelectOnChange;

      case "checkbox":
        // return () => {
        //   handleCommonFunctionCalls(
        //     !(values[id] as IInputFieldState).inputValue
        //   );
        // };
        return (value: ICheckboxValue) => {
          handleCommonFunctionCalls(value);
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
          handleRestUrlDependencyCondition(
            inputFieldState,
            inputValue,
            values,
            handleSetKey
          );
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
  };

  const handleErrorMessage = (
    id: string,
    show: boolean,
    errorMsg: string | undefined | null
  ) => {
    handleSetKey(id, "isError", show);
    handleSetKey(
      id,
      "errorMsg",
      errorMsg !== undefined || null ? (errorMsg as string) : ""
    );
  };

  const handleInputBlur: IHandleInputBlur = (
    inputFieldState: IInputFieldState
  ) => {
    const { id, type } = inputFieldState;

    const handleErrorMessage = (
      id: string,
      show: boolean,
      errorMsg: string | undefined | null,
    ) => {

      // If no error
      if (!show && !errorMsg) {
        console.log("input Blur ", inputFieldState, features)

        handleSetKey(id, "isError", false);
        handleSetKey(
          id,
          "errorMsg",
          ""
        );

      }
      handleSetKey(id, "isError", show);
      handleSetKey(
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
              inputFieldState.regexerrormsg,
            );
          }

          return handleErrorMessage(id, false, "");
        };

      case "select":
      case "dropdown":
        return () => {
          if (
            inputFieldState.required &&
            !(values[(id as keyof IInputFieldsState)] as IInputFieldState).inputValue
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

          // handle tag addition
          handleTagsCreation(
            inputFieldState,
            handleSetKey,
            e.target.value
          );

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
  };

  return {
    values,
    handleSetValues,
    handleSetKey,
    getValues: () => getValues(values),
    checkRequiredFields: (setErrors = true) => checkRequiredFields(setErrors, values),
    handleInputChange,
    handleInputBlur,
  };
};
