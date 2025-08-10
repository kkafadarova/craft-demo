import type { RequiredCheckboxFieldProps } from "../../../types";
import styles from "./RequiredCheckboxField.module.scss";

const RequiredCheckboxField = ({
  value,
  onChange,
}: RequiredCheckboxFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkbox}
        />
        A value is required
      </label>
    </div>
  );
};

export default RequiredCheckboxField;
