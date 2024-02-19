export interface ISettings {
    editData: string | null;
    approvalFlag: boolean;
    columnSize: number;
    formKey: string;
    stage: string;
    financialAnalysis: boolean;
    financialSpreading: boolean;
    esddChecklist: boolean;
    cashFlowAnalysis: boolean;
    queryoption: boolean;
    mobilereadonly: boolean;
    defaultonvisibility: boolean;
    formbasedcalculation: boolean;
    apitrigger: boolean;
    savereload: boolean;
}

export interface IUseInputMaster {
    settings?: ISettings;
}
export interface IFormCategoryData {
    columnSize: 0;
    displayLabel: boolean;
    floatingbutton: boolean;
    id: string;
    name: string;
    readOnly: boolean;
    retainInfo: boolean;
    type: string;
    value: string;
    options: Array<{ key: string; value: string }>;
}