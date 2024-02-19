/* eslint-disable react-hooks/exhaustive-deps */
import Dustbin from "~/assets/icons/Delete";

import InputFields from "..";
import Accordion from "../../../atoms/Accordion";
import { IInputFieldsState, IInputRepeaterTagFieldState } from "../types/IInputFieldsState";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IUseInputFields } from "../types/IUseInputFields";
import { IFormCategoryData } from "../types/IFormCategoryData";
import { useInputFields } from "../hooks/useInputFields";
import { useEffect } from "react";
import { copyNestedObj } from "~/utils/utils";
import { ITagGroupProps, IUpdateRepeaterParentState } from "../types/IRepeaterTagData";

interface ITagsInputFieldsProps {
  repeaterInput: IInputRepeaterTagFieldState;
  disableAll?: boolean;
  formCategoryData: IFormCategoryData | undefined;
  handleSetKey: IUseInputFields['handleSetKey'];
}

const TagsInputFields: React.FC<ITagsInputFieldsProps> = ({
  repeaterInput,
  disableAll,
  handleSetKey,
  formCategoryData
}) => {
  const handleDeleteRepeaterClick = (index: number) => {
    const c = repeaterInput.repeaterFormFields;
    if (!c) return;
    delete c[index];

    if (handleSetKey) {
      // @ts-ignore
      handleSetKey(repeaterInput.name, "repeaterFormFields", c);
      if (repeaterInput.tagParentInput) handleSetKey(repeaterInput.tagParentInput, "inputValue", Object.keys(c).length);
    }
  };

  const updateParentState: IUpdateRepeaterParentState = (key, repeaterState) => {
    handleSetKey(repeaterInput.name, "repeaterFormFields", {
      ...repeaterInput.repeaterFormFields,
      [key]: repeaterState,
    });
  }

  return (
    <div className={`col-span-full`}>
      {Object.keys(repeaterInput.repeaterFormFields as IInputFieldsState).map((key, index) => (
        <TagGroup
          repeaterInput={repeaterInput}
          tKey={Number(key)}
          index={index}
          disableAll={disableAll}
          handleDeleteRepeaterClick={handleDeleteRepeaterClick}
          updateParentState={updateParentState}
          formCategoryData={formCategoryData}
        />
      ))}
    </div>
  );
};

const TagGroup: React.FC<ITagGroupProps> = ({ repeaterInput, formCategoryData, tKey, index, disableAll, handleDeleteRepeaterClick, updateParentState }) => {
  const v = useInputFields();

  useEffect(() => {
    const repValues = v.values;
    repValues["checkRequiredFields"] = () => v.checkRequiredFields(true);
    updateParentState(tKey, repValues);
  }, [v.values])

  useEffect(() => {
    if (!repeaterInput.repeaterFormFields) return;
    let dataObj = repeaterInput.repeaterFormFields[tKey as unknown as number];
    if (Object.keys(dataObj).length === 0) {
      console.log("using default", repeaterInput);
      dataObj = copyNestedObj(repeaterInput.repeaterFields);
    }
    dataObj["checkRequiredFields"] = () => v.checkRequiredFields(true);
    v.handleSetValues(dataObj);
    updateParentState(tKey, dataObj);
  }, [])
  return (
    <Accordion
      variant='secondary'
      items={[
        {
          title: `${repeaterInput.name} - ${index + 1}`,
          content: (
            <>
              <div
                key={`repeater-${repeaterInput.name}-${tKey}`}
                className='mb-4'
              >
                <div className='flex items-center justify-end w-full'>
                  <div
                    onClick={() =>
                      handleDeleteRepeaterClick(tKey as unknown as number)
                    }
                    className='flex items-center justify-center w-8 h-8 mb-3 ml-3 rounded cursor-pointer bg-error-light text-error'
                  >
                    <Dustbin />
                  </div>
                </div>

                <InputFields
                  {...v}
                  disableAll={disableAll}
                  repeaterName={repeaterInput.name}
                  repeaterIndex={tKey as unknown as number}
                  gridColumns={repeaterInput.columnSize || 3}
                  formCategoryData={formCategoryData}
                />
              </div>
            </>
          ),
        },
      ]}
    />
  )
}

export default TagsInputFields;
