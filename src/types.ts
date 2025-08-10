export type PayloadData = {
  label: string;
  defaultValue: string;
  order: string;
  type: string;
  required: boolean;
  choices: string[];
};

export type FormData = Omit<PayloadData, "choices"> & {
  choices: string; 
}
export type FormErrors = {
  label?: string;
  choices?: string;
  defaultValue?: string;
  type?: string;
};

export type State = {
  form: FormData;
  errors: FormErrors;
};

export enum ActionType {
  UPDATE = "UPDATE",
  RESET = "RESET",
  VALIDATE = "VALIDATE",
}

export type Action =
  | { type: ActionType.UPDATE; payload: Partial<FormData> }
  | { type: ActionType.RESET }
  | { type: ActionType.VALIDATE; payload: FormErrors };

export type FieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export type RequiredCheckboxFieldProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "negative";
};






