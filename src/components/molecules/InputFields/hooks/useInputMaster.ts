import { IUseInputMaster } from "../types/IUseInputMaster";
import { useInputFields } from "./useInputFields";
import { useTableFields } from "./useTableFields";

export const useInputMaster = (props: IUseInputMaster) => {
    const f = useInputFields();
    const t = useTableFields();

    
    if(props?.settings?.financialSpreading)
        return t;

    return f;
}