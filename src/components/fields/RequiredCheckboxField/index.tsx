import type { RequiredCheckboxFieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const RequiredCheckboxField = ({
  value,
  onChange,
}: RequiredCheckboxFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>A value is required</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.checkbox}
      />
    </div>
  );
};

export default RequiredCheckboxField;
