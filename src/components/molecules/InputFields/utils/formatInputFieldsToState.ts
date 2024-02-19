/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Post } from "../../../../api/request";
import { IRepeaterTagData, IRepeaterValues } from "../types/IRepeaterTagData";
import { getInputDefaultValue } from "./getInputDefaultValue";
import { setInputValue } from "./setInputValue";
import { IInputField, IInputFieldsState, IInputRepeaterTagFieldState } from "../types/IInputFieldsState";
import { copyNestedObj } from "~/utils/utils";
import { IFormatInputFieldsToState, ITagRepeaterForms } from "../types/IFormatFields";

export const TOP_LEVEL_TAG = "Applicant";

export type IGetRepeaterDataForInput = (
  input: IInputField,
  repeaterData?: Array<IRepeaterTagData>,
  repeaterValues?: IRepeaterValues
) => IRepeaterTagData | null;

export const getRepeaterDataForInput: IGetRepeaterDataForInput = (
  input,
  repeaterData
) => {
  if (!repeaterData) return null;

  return repeaterData.find(({ options }) =>
    options.map(({ key }) => key).includes(input.id)
  ) || null;
};



export const formatInputFieldsToState: IFormatInputFieldsToState = (
  fields,
  repeaterData = [], // done or else fields are not rendered
  repeaterValues,
  tagData,
  tagValues
) => {
  if (!fields) return {};
  const tagRepeaterForms: ITagRepeaterForms = {};
  const addToTagRepeaterForms = (tag: string, inputField: IInputField) => {
    tagRepeaterForms[tag] = tagRepeaterForms[tag] || {
      parent: (inputFieldsState[tag as keyof IInputFieldsState] as IInputRepeaterTagFieldState),
      fields: [],
      repeaterData: repeaterData,
      repeaterValues: repeaterValues ? repeaterValues[tag] : {},
      tagValues: tagValues
    };
    tagRepeaterForms[tag].fields.push(inputField);
  }
  /**
   * Starting object that is populated and then
   * returned at the end
   */
  const inputFieldsState = {} as IInputFieldsState;
  if (tagData) {
    tagData.options.forEach((tag) => {
      if (tag.key === TOP_LEVEL_TAG) {
        return;
      }

      inputFieldsState[tag.key as keyof IInputFieldsState] = {
        ...tagData,
        type: "tags",
        id: tag.key,
        name: tag.value,
        repeaterFields: {},
        repeaterFormFields: {},
      };
    });
  }
  fields.forEach(async (inputField) => {

    if (tagData) {
      /**
       * If tag is present for an input, include the
       * input state in the corresponding tag
       */
      if (inputField.tag) {
        // add the input to the corresponding tag
        if (inputField.tag === TOP_LEVEL_TAG) {
          checkAndAddInputToRepeater(inputFieldsState, copyNestedObj(inputField));
        } else {
          addToTagRepeaterForms(inputField.tag, copyNestedObj(inputField));
        }
      } else {
        /**
         * If tag is not present on an input field,
         * that means this input field needs to be included
         * in all the tags.
         *
         * map through all the tags to add input
         * +
         * add input to the top level i.e. Applicant level
         */
        tagData.options.forEach(({ key }) => {
          if (key !== TOP_LEVEL_TAG) {
            addToTagRepeaterForms(key, copyNestedObj(inputField));
          }
        });
        checkAndAddInputToRepeater(inputFieldsState, copyNestedObj(inputField));
      }

      // if tag data exists, then don't go forward;
      return;
    }

    /** If input belongs to a repeater */
    const repeater = getRepeaterDataForInput(inputField, repeaterData);
    if (repeater) {
      if (!inputFieldsState[repeater.name as keyof IInputFieldsState]) {
        inputFieldsState[repeater.name as keyof IInputFieldsState] = {
          ...repeater,
          repeaterFields: {},
          repeaterValues: repeaterValues?.[repeater.name] as IRepeaterValues,
          formCategory: inputField.formCategory,
        };
      }

      const copyInputField = copyNestedObj(inputField);
      copyInputField.formCategory = "";
      addToTagRepeaterForms(repeater.name, copyInputField);

      return;
    }

    checkAndAddInputToRepeater(inputFieldsState, inputField);
  });

  console.log("tagRepeaterForms", tagRepeaterForms);
  Object.keys(tagRepeaterForms).forEach((tag) => {
    if (tagRepeaterForms[tag].parent.type === "repeater") {
      tagRepeaterForms[tag].parent.repeaterFields = formatInputFieldsToState(
        tagRepeaterForms[tag].fields
      )
      tagRepeaterForms[tag].parent.repeaterFormFields = tagRepeaterForms[tag].parent.repeaterFormFields || {};
      const thisFormField = tagRepeaterForms[tag].parent.repeaterFormFields || {};

      if (repeaterValues) {
        (repeaterValues[tag] as object[])?.forEach((repeaterValue, index) => {
          const repFields = copyNestedObj(tagRepeaterForms[tag].fields) as IInputField[];
          repFields.forEach((field, index) => {
            repFields[index].value = repeaterValue[field.id as keyof object];
          })

          thisFormField[Date.now() + index * 10] = formatInputFieldsToState(
            repFields
          );
        })
      }
    } else {
      tagRepeaterForms[tag].parent.repeaterFields = formatInputFieldsToState(
        tagRepeaterForms[tag].fields,
        tagRepeaterForms[tag].repeaterData,
        tagRepeaterForms[tag].repeaterValues ? tagRepeaterForms[tag].repeaterValues[tag] as IRepeaterValues : undefined
      )

      if (tagValues) {
        tagRepeaterForms[tag].parent.repeaterFormFields = tagRepeaterForms[tag].parent.repeaterFormFields || {};
        const thisFormField = tagRepeaterForms[tag].parent.repeaterFormFields || {};
        (tagValues[tag] as object[])?.forEach((repeaterValue, index) => {
          const repFields = copyNestedObj(tagRepeaterForms[tag].fields) as IInputField[];
          repFields.forEach((field, index) => {
            if (field.type === "repeater") {
              addToTagRepeaterForms(field.tag || "", field);
            }
            repFields[index].value = repeaterValue[field.id as keyof object];
          })
          thisFormField[Date.now() + index * 10] = formatInputFieldsToState(
            repFields,
            tagRepeaterForms[tag].repeaterData,
            tagRepeaterForms[tag].repeaterValues ? tagRepeaterForms[tag].repeaterValues[index] as IRepeaterValues : undefined
          );
        })
      }
    }
  });

  return inputFieldsState;
};

/**
 * adds the input under the parent obj
 */
export const checkAndAddInputToRepeater = (
  repeaterParent: IInputFieldsState,
  inputField: IInputField
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
  if (inputField.type === "blank") {
    const index = Object.keys(repeaterParent).filter((key) =>
      key.includes(inputField.id)
    );
    inputField.id = `${inputField.id}-${index}`
  }

  // Set options to empty array if not present
  if (inputField.type === "dropdown" && !inputField.options) { inputField.options = [] }
  if (inputField.selectoption) { inputField.required = true }

  repeaterParent[inputField.id as keyof IInputFieldsState] = {
    ...inputField,
    ...inputFieldStateProperties,
  };
};
