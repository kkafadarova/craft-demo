import { TypeOptionValue, type FieldProps } from "../../../../types";
import LabeledSelectField from "../index";

const TYPE_OPTIONS = [
  { value: TypeOptionValue.SINGLE, label: "Single select" },
  { value: TypeOptionValue.MULTI, label: "Multi-select" },
];

const TypeField = ({ value, onChange }: FieldProps) => {
  return (
    <LabeledSelectField
      label="Type"
      value={value}
      onChange={onChange}
      options={TYPE_OPTIONS}
    />
  );
};

export default TypeField;
