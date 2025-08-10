import { OrderOptionValue, type FieldProps } from "../../../../types";
import LabeledSelectField from "../index";

const ORDER_OPTIONS = [
  {
    value: OrderOptionValue.ASC,
    label: "Display choices in alphabetical order",
  },
  { value: OrderOptionValue.DESC, label: "Display choices in reverse order" },
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
