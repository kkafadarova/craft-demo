import type { FieldProps } from "../../../../types";
import LabeledSelectField from "../index";

const ORDER_OPTIONS = [
  { value: "asc", label: "Display choices in alphabetical order" },
  { value: "desc", label: "Display choices in reverse order" },
];

const OrderField = ({ value, onChange }: FieldProps) => {
  return (
    <LabeledSelectField
      label="Order"
      value={value}
      onChange={onChange}
      options={ORDER_OPTIONS}
    />
  );
};

export default OrderField;
