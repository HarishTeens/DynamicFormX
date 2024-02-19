export type IInputValue = Exclude<
  React.InputHTMLAttributes<HTMLInputElement>["value"],
  undefined
>;

export type IInputOnChange = Exclude<
  React.InputHTMLAttributes<HTMLInputElement>["onChange"],
  undefined
>;

export type IInputOnBlur = Exclude<
  React.InputHTMLAttributes<HTMLInputElement>["onBlur"],
  undefined
>;
