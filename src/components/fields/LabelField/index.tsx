import type { FieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const LabelField: React.FC<FieldProps> = ({ value, onChange, error }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Label</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a label field"
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default LabelField;
