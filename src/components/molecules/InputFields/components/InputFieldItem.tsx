import BlankInput from "~/components/atoms/Blank";
import { IInputFieldState, IInputFieldsState } from "../types/IInputFieldsState";
import { IHandleInputBlur, IHandleInputChange, IHandleSetKey } from "../types/IUseInputFields";
import Slider from "~/components/atoms/Slider";
import Input from "~/components/atoms/Input";
import { ISliderOnChange } from "~/components/atoms/Slider/types";
import { IInputOnChange } from "~/components/atoms/Input/types";
import UploadInput, { IFileUploadResponse } from "~/components/atoms/UploadInput";
import { IFileOnChange } from "~/components/atoms/UploadInput/types";
import Select, { IReactSelectOnChange } from "~/components/atoms/Select/SingleMultiSelect";
import { ISelectOption, ISelectValue } from "~/components/atoms/Select/types";
//import Checkbox from "~/components/atoms/Checkbox";
import CheckboxData from "~/components/atoms/Checkbox/CheckboxData";
import { ICheckboxOnChange, ICheckboxOptions, ICheckboxValue } from "~/components/atoms/Checkbox/types";
import RadioGroup from "~/components/atoms/Radio/RadioGroup";
import { IEditor, IRadioOnChange, IRadioOptions, IRadioValue } from "~/components/atoms/Radio/types";
import TextArea from "~/components/atoms/TextArea";
import { IColorOnChange } from "~/components/atoms/ColorPicker/types";
import Colors from "~/components/atoms/ColorPicker";

interface IInputFieldItemProps {
    input: IInputFieldState;
    disableAll?: boolean;
    handleInputChange: IHandleInputChange;
    handleInputBlur: IHandleInputBlur;
    handleSetKey: IHandleSetKey;
    values: IInputFieldsState;
    isFormSubmitted?: boolean;
    gridColumns?: number;
    cellDisplay?: boolean;
}

const InputFieldItem = (props: IInputFieldItemProps) => {
    const {
        input,
        disableAll,
        handleInputChange,
        handleInputBlur,
        isFormSubmitted,
        cellDisplay,
    } = props;

    if (input.hide || input.hidden) {
        return <></>;
    }

    switch (input.type) {
        case "blank":
            return (
                <div key={input.id} className='col-span-1 pb-5'>
                    <BlankInput
                    />
                </div>
            );

        case "number":
        case "decimal":
        case "integer":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} pb-5`}>
                    {!cellDisplay && <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>}
                    {input.slider ? (
                        <Slider
                            value={input.inputValue as number}
                            min={input.minvalue as number}
                            max={input.maxvalue as number}
                            onChange={handleInputChange(input) as ISliderOnChange}
                            inputType={input.type as "integer" | "decimal"}
                            inputProps={{
                                disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                            }}
                            indicator={input.isError ? "error" : undefined}
                            helperText={input.errorMsg}
                        />
                    ) : (
                        <Input
                            id={input.id}
                            value={input.inputValue as string | number}
                            onChange={handleInputChange(input) as IInputOnChange}
                            inputProps={{
                                type: 'number',
                                disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                                onBlur: handleInputBlur && handleInputBlur(input),
                                min: input.minvalue as number,
                                max: input.maxvalue as number,
                                minLength: input.min as number,
                                maxLength: input.max as number,
                            }}
                            placeholder={""}
                            indicator={input.isError ? "error" : undefined}
                            helperText={input.errorMsg}
                        />
                    )}
                </div>
            );

        case "upload":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} pb-5`}>
                    <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>
                    <UploadInput
                        multiple={input.multipleFiles}
                        onChangeUpload={handleInputChange(input) as IFileOnChange}
                        initialValue={input.inputValue as unknown as IFileUploadResponse[]}
                        inputProps={{
                            disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                        }}
                        indicator={input.isError ? "error" : undefined}
                    />
                    {input.errorMsg && input.isError && (
                        <p
                            id='outlined_helper_text'
                            className={`mt-2 text-xs border-0 border-error text-error focus:border-erro`}
                        >
                            {input.errorMsg}
                        </p>
                    )}
                </div>
            );
        case "select":
        case "dropdown":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} ${cellDisplay ? "" : "pb-5"}`}>
                    {!cellDisplay && <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>}
                    <Select
                        isMulti={!!input.multiSelect}
                        isSearchable={!!input.autocomplete}
                        value={input.inputValue as ISelectValue}
                        options={input.options as Array<ISelectOption>}
                        onChange={handleInputChange(input) as IReactSelectOnChange}
                        isDisabled={disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)}
                        onBlur={handleInputBlur && handleInputBlur(input)}
                        indicator={input.isError ? "error" : undefined}

                    />
                    {input.errorMsg && input.isError && (
                        <p
                            id='outlined_helper_text'
                            className={`mt-2 text-xs border-0 border-error text-error focus:border-erro`}
                        >
                            {input.errorMsg}
                        </p>
                    )}
                </div>
            );

        case "checkbox":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} pb-5`}>
                    <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>
                    <CheckboxData
                        value={input.inputValue as ICheckboxValue[]}
                        onChange={handleInputChange(input) as ICheckboxOnChange}
                        options={input.options as ICheckboxOptions}
                        inputProps={{
                            disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                            onBlur: handleInputBlur && handleInputBlur(input),
                        }}
                        indicator={input.isError ? "error" : undefined}
                        columnWidth={input?.columncount || 1}
                    />
                    {input.errorMsg && input.isError && (
                        <p
                            id='outlined_helper_text'
                            className={`mt-2 text-xs border-0 border-error text-error focus:border-erro`}
                        >
                            {input.errorMsg}
                        </p>
                    )}
                </div>
            );

        case "radio":
        case "radio-buttons":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} pb-5`}>
                    <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>
                    <RadioGroup
                        value={input.inputValue as IRadioValue}
                        onChange={handleInputChange(input) as IRadioOnChange}
                        options={input.options as IRadioOptions}
                        inputProps={{
                            disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                            onBlur: handleInputBlur && handleInputBlur(input),
                        }}
                        indicator={input.isError ? "error" : undefined}
                    />
                    {input.errorMsg && input.isError && (
                        <p
                            id='outlined_helper_text'
                            className={`mt-2 text-xs border-0 border-error text-error focus:border-erro`}
                        >
                            {input.errorMsg}
                        </p>
                    )}
                </div>
            );
        case "multi-line-text":
            // if (input?.formatted) return <RichTextEditor></RichTextEditor> // #TODO: Implement CKEditor
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} pb-5`}>
                    <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>
                    <TextArea
                        value={input.inputValue as string | number}
                        handleChange={handleInputChange(input) as IEditor}
                        inputProps={{
                            disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                            onBlur:
                                handleInputBlur &&
                                handleInputBlur(input) as (e: unknown) => void,
                        }}
                        placeholder={input.placeholder || ""}
                        indicator={input.isError ? "error" : undefined}
                        helperText={input.errorMsg}
                    />
                </div>
            )
        // Not handled here, handled below
        // Feature Input Form Fields are rendered here except for the ones that belong to FeatureMaster 
        case "feature":
            return null;
        case "text":
        case "password":
        case "email":
        case "date":
            return (
                <div key={input.id} className={`col-span-${input?.columncount || 1} ${cellDisplay ? "" : "pb-5"}`}>
                    {!cellDisplay && <p className='mb-1 text-sm font-semibold'>
                        {input.name || input.placeholder}{" "}
                        {input.required && <span className='text-error'>*</span>}
                    </p>}
                    {input.colorpicker ? (
                        <Colors
                            value={input.inputValue as string}
                            onChange={handleInputChange(input) as IColorOnChange}
                        />
                    ) : (
                        <Input
                            id={input?.id}
                            value={input.inputValue as string | number}
                            onChange={handleInputChange(input) as IInputOnChange}
                            inputProps={{
                                type: ["integer", "decimal", "number"].includes(
                                    input.type
                                )
                                    ? "number"
                                    : input.type,
                                disabled: (disableAll || input.readOnly || (isFormSubmitted && input.retainInfo)),
                                onBlur: handleInputBlur && handleInputBlur(input),
                                min: input.minvalue as number,
                                max: input.maxvalue as number,
                                minLength: input.min as number,
                                maxLength: input.max as number,
                            }}
                            placeholder={""}
                            indicator={input.isError ? "error" : undefined}
                            helperText={input.errorMsg}
                            decoration={input?.uppercase ? "uppercase" : input?.lowercase ? "lowercase" : null}
                        />
                    )}
                </div>
            );
    }
}
export default InputFieldItem;