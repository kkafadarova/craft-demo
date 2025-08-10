import type { LabeledSelectFieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const LabeledSelectField = ({
  label,
  value,
  onChange,
  options,
}: LabeledSelectFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LabeledSelectField;
