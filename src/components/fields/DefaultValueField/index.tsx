import type { FieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const DefaultValueField: React.FC<FieldProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Default Value</label>
      <div className={styles.control}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a default value"
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};
export default DefaultValueField;
