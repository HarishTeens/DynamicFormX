import { useEffect } from "react";
import InputFields from "~/components/molecules/InputFields"
import { useInputMaster } from "~/components/molecules/InputFields/hooks/useInputMaster"
import { IInputField } from "~/components/molecules/InputFields/types/IInputFieldsState";
import { form1 } from "~/constants/formSample";

const FormView = () => {
    const v = useInputMaster({ settings: form1.settings });
    useEffect(() => {
        v.handleSetValues(form1.formData as IInputField[]);
    }, [])
    return (
        <div className="w-1/2 border">
            <h2 className="text-center text-2xl">Preview</h2>
            <div>
                <InputFields
                    disableAll={false}
                    settings={form1.settings}
                    {...v}
                />
            </div>
        </div>
    )
}

export default FormView