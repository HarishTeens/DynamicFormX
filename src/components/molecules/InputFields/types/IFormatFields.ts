import { IInputField, IInputFieldsState, IInputRepeaterTagFieldState } from "./IInputFieldsState";
import { IRepeaterTagData, IRepeaterValues } from "./IRepeaterTagData";

export type IFormatInputFieldsToState = (
    fields?: Array<IInputField>,
    repeaterData?: Array<IRepeaterTagData>,
    repeaterValues?: IRepeaterValues,
    tagData?: IRepeaterTagData | null,
    tagValues?: IRepeaterValues
) => IInputFieldsState;

export type ITagRepeaterForm = {
    parent: IInputRepeaterTagFieldState,
    fields: Array<IInputField>,
    repeaterData: Array<IRepeaterTagData>,
    repeaterValues: IRepeaterValues,
    tagValues: IRepeaterValues

}

export type ITagRepeaterForms = Record<string, ITagRepeaterForm>