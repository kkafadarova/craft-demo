import type { FieldProps } from "../../../../types";
import LabeledSelectField from "../index";

const TYPE_OPTIONS = [
  { value: "single", label: "Single select" },
  { value: "multi", label: "Multi-select" },
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
