/* eslint-disable react-hooks/exhaustive-deps */
import Add from "~/assets/icons/Add";
import Dustbin from "~/assets/icons/Delete";

import InputFields from "..";
import { copyNestedObj } from "~/utils/utils";
import { useInputFields } from "../hooks/useInputFields";
import { useEffect } from "react";
import { IRepeaterGroupProps, IRepeaterInputFieldsProps, IUpdateRepeaterParentState } from "../types/IRepeaterTagData";
import Accordion from "~/components/atoms/Accordion";

/* eslint-disable @typescript-eslint/ban-ts-comment */


const RepeaterInputFields: React.FC<IRepeaterInputFieldsProps> = ({
  repeaterInput,
  handleSetKey,
  disableAll
}) => {
  const updateParentState: IUpdateRepeaterParentState = (key, repeaterState) => {
    handleSetKey(repeaterInput.name, "repeaterFormFields", {
      ...repeaterInput.repeaterFormFields,
      [key]: repeaterState,
    });
  }
  const handleAddRepeaterClick = () => {
    if (handleSetKey) {
      repeaterInput.repeaterFormFields = repeaterInput.repeaterFormFields || {};
      const keys = Object.keys(repeaterInput.repeaterFormFields)
      if (keys.length > 0) {
        const lastKey = Number(keys[keys.length - 1]);
        const lastValue = repeaterInput.repeaterFormFields[lastKey];
        if (lastValue && typeof lastValue.checkRequiredFields === 'function') {
          if (!lastValue.checkRequiredFields()) {
            return;
          }
        }
      }
      // @ts-ignore
      handleSetKey(repeaterInput.name, "repeaterFormFields", {
        ...repeaterInput.repeaterFormFields,
        [Date.now()]: {}, // actual state data declared inside RepeaterGroup
      });
      // }
    }
  };

  const handleDeleteRepeaterClick = (index: number) => {
    const c = repeaterInput.repeaterFormFields;
    if (!c) return;
    delete c[index];

    if (handleSetKey) {
      // @ts-ignore
      handleSetKey(repeaterInput.name, "repeaterFormFields", c);
    }
  };

  useEffect(() => {
    const curRepeaterValue = repeaterInput.repeaterValues || Object.keys(repeaterInput.repeaterFormFields || {}).length;
    if (!curRepeaterValue) {
      handleAddRepeaterClick();
    }
  }, [])

  if (!repeaterInput.repeaterFormFields)
    return null;

  return (
    <div className={`col-span-full`}>
      <div className='flex items-center justify-end mb-3 rounded'>

        {!disableAll && !repeaterInput.readOnly && (
          <div
            onClick={handleAddRepeaterClick}
            className='flex items-center justify-center w-8 h-8 rounded cursor-pointer bg-primary-light text-primary'
          >
            <Add />
          </div>
        )}
      </div>

      {Object.keys(repeaterInput.repeaterFormFields).map((key, index) => {
        if (repeaterInput.displayLabel) {
          return (
            <div>
              <Accordion
                variant="secondary"
                open={index === 0}
                items={[
                  {
                    title: Object.values(repeaterInput?.repeaterFields)?.[0]?.name || "",
                    content: <RepeaterGroup
                      repeaterInput={repeaterInput}
                      key={key}
                      rKey={Number(key)}
                      index={index}
                      disableAll={disableAll}
                      handleDeleteRepeaterClick={handleDeleteRepeaterClick}
                      updateParentState={updateParentState}
                    />,
                  },
                ]}
              />
            </div>
          )
        } else {
          return (
            <RepeaterGroup
              repeaterInput={repeaterInput}
              key={key}
              rKey={Number(key)}
              index={index}
              disableAll={disableAll}
              handleDeleteRepeaterClick={handleDeleteRepeaterClick}
              updateParentState={updateParentState}
            />
          )
        }

      })}
    </div>
  );
};

const RepeaterGroup: React.FC<IRepeaterGroupProps> = ({ rKey, index, repeaterInput, disableAll, handleDeleteRepeaterClick, updateParentState }) => {
  const v = useInputFields();
  const key = index + 1;

  useEffect(() => {
    if (!repeaterInput.repeaterFormFields) return;
    let dataObj = repeaterInput.repeaterFormFields[rKey];
    if (Object.keys(dataObj).length === 0) {
      console.log("using default", repeaterInput);
      dataObj = copyNestedObj(repeaterInput.repeaterFields);
    }
    dataObj["checkRequiredFields"] = () => v.checkRequiredFields(true);
    v.handleSetValues(dataObj);
    updateParentState(rKey, dataObj);
  }, [])

  useEffect(() => {
    const repValues = v.values;
    repValues["checkRequiredFields"] = () => v.checkRequiredFields(true);
    updateParentState(rKey, repValues);
  }, [v.values])

  return (
    <div
      key={rKey}
      className='flex items-start justify-between mb-6'
    >
      <div className='mt-10 mr-3'>
        <p>{key}.</p>
      </div>

      <div className='flex-1'>
        <InputFields
          {...v}
          key={rKey}
          repeaterName={repeaterInput.name}
          repeaterIndex={key as unknown as number}
          gridColumns={repeaterInput.columnSize || 2}
        />
      </div>

      {!disableAll && !repeaterInput.readOnly && index >= 1 && (
        <div
          onClick={() =>
            handleDeleteRepeaterClick(rKey as unknown as number)
          }
          className='flex items-center justify-center w-8 h-8 mt-8 ml-3 rounded cursor-pointer bg-error-light text-error'
        >
          <Dustbin />
        </div>
      )}
    </div>
  );
}

export default RepeaterInputFields;
