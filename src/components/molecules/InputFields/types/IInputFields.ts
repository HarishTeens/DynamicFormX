export type IInputType =
  | "text"
  | "password"
  | "integer"
  | "decimal"
  | "number"
  | "checkbox"
  | "radio"
  | "select"
  | "dropdown"
  | "radio-buttons"
  | "email"
  | "upload"
  | "repeater"
  | "tags"
  | "blank"
  | "date"
  | "feature"
  | "multi-line-text"
  | "feature"
  | "date";

export type IInputValue = string | number | boolean | object | null;

export interface IInputFieldResponse {
  id: string;
  type: IInputType;
  value: IInputValue;
  required: boolean;
  placeholder: string | null;
  options: Array<{ key: string; value: IInputValue }> | null;

  name: string;
  readOnly: boolean;
  visibilityCondition: string | null;
  visibilityEvent: "onchange" | "onload" | null;
  visibilityField:
  | "show"
  | "hide"
  | "readonly"
  | "defaultvalue"
  | "required"
  | null;
  visibilityOperation:
  | "equals"
  | "notequals"
  | "greaterthan"
  | "greaterthanequalto"
  | "lessthan"
  | "lessthanequalto"
  | "like"
  | "notlike"
  | "in"
  | "notin"
  | "isempty"
  | "isnotempty"
  | null;
  visibilityOperationMatchValue: string | null;
  dependencyCondition: string | null;
  dependencyEvent: "onchange" | "onload" | null;
  tag: string | null;
  restUrl: string | null;
  expression: string | null;
  intermediateExpression: string | null;
  format: string | null;
  mask: string | null;
  min: number | null;
  max: number | null;
  minvalue: number | null;
  maxvalue: number | null;
  currency: boolean;
  multipleFiles: boolean;
  hidden: boolean;
  defaultValue: string | null;
  tagAssociation: boolean;
  tagOperation: string | null;
  tagOperationMatchValue: string | number | null;
  tagAssociatedValue: string | null;
  jsField: boolean;
  retainInfo: boolean;
  precision: string | null;
  formatted: boolean;
  tagIndex: 0;
  multiSelect: boolean;
  autocomplete: boolean;
  formCategory: string | null;
  link: boolean;
  button: boolean;
  remarks: string | null;
  toolTipText: string | null;
  navigation: string | null;
  bold: boolean;
  extraValue: string | null;
  inputJson: string | null;
  outputJson: string | null;
  requestJson: string | null;
  featureCode: string | null;
  featureName: string | null;
  displayFormat: string | null;
  onLoad: boolean;
  apponly: boolean;
  phone: boolean;
  pastDateAllowed: boolean;
  currentDateAllowed: boolean;
  futureDateAllowed: boolean;
  uploadtype: string | null;
  labelcolor: string | null;
  segmentid: string | null;
  rowcount: string | null;
  columncount: string | null;
  selectoption: boolean;
  othersoption: boolean;
  regex: string | null;
  regexerrormsg: string | null;
  lengtherrormsg: string | null;
  valueerrormsg: string | null;
  floating: boolean;
  filesize: string | null;
  fileformat: string | null;
  filesizeerrormsg: string | null;
  fileextensionerrormsg: string | null;
  password: boolean;
  persist: boolean;
  lowercase: boolean;
  uppercase: boolean;
  errormsg: string | null;
  successmsg: string | null;
}

