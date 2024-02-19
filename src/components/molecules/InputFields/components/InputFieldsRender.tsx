import { IFormCategoryData } from "../types/IFormCategoryData";
import {
  IInputFieldState,
  IInputRepeaterTagFieldState,
} from "../types/IInputFieldsState";
import { IUseInputFields } from "../types/IUseInputFields";
import RepeaterInputFields from "./Repeater";
import TagsInputFields from "./Tags";
import InputFieldItem from "./InputFieldItem";
import { ISettings } from "../types/IUseInputMaster";

export interface IInputFieldsRendererProps extends IUseInputFields {
  disableAll?: boolean;
  repeaterName?: string;
  repeaterIndex?: number;
  tagName?: string;
  tagIndex?: number;
  tagInput?: IInputRepeaterTagFieldState;
  formCategoryData?: IFormCategoryData | undefined;
  isFormSubmitted?: boolean;
  settings?: ISettings;
  gridColumns?: number;
}

const InputFieldsRenderer: React.FC<IInputFieldsRendererProps> = ({
  settings,
  disableAll,
  handleInputChange,
  handleInputBlur,
  handleSetKey,
  values,
  isFormSubmitted,
  formCategoryData,
  gridColumns: _gridColumns,
  ...rest
}) => {
  const gridColumns = settings?.columnSize || _gridColumns || 3;
  return (
    <>
      <div className={`grid grid-cols-${gridColumns} gap-4`}>
        {Object.values(values)
          .sort((inputA, inputB) => {
            if ((inputA as IInputRepeaterTagFieldState).type === "tags" && (inputB as IInputRepeaterTagFieldState).type !== "tags") return 1;
            if ((inputA as IInputRepeaterTagFieldState).type !== "tags" && (inputB as IInputRepeaterTagFieldState).type === "tags") return -1;
            return 0;
          })
          .map((i) => {
            if ((i as IInputRepeaterTagFieldState).type === "repeater") {
              return (
                <RepeaterInputFields
                  {...rest}
                  disableAll={disableAll}
                  repeaterInput={i as IInputRepeaterTagFieldState}
                  handleSetKey={handleSetKey}
                />
              );
            }

            if ((i as IInputRepeaterTagFieldState).type === "tags") {
              return (
                <TagsInputFields
                  disableAll={disableAll}
                  repeaterInput={i as IInputRepeaterTagFieldState}
                  handleSetKey={handleSetKey}
                  formCategoryData={formCategoryData}
                />
              );
            }
            const input = i as IInputFieldState;

            return <InputFieldItem
              input={input}
              disableAll={disableAll}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              handleSetKey={handleSetKey}
              values={values}
              isFormSubmitted={isFormSubmitted}
              gridColumns={gridColumns}
            />;
          })}
      </div>
      <br />

      {/* Dummy divs so that the classes get included in the bundle */}
      <div className=''>
        <div className='grid-cols-1' />
        <div className='grid-cols-2' />
        <div className='grid-cols-3' />
        <div className='col-span-1' />
        <div className='col-span-2' />
        <div className='col-span-3' />
      </div>
    </>
  );
};

export default InputFieldsRenderer;