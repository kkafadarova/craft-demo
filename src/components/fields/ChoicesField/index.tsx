import type { FieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const ChoicesField: React.FC<FieldProps> = ({ value, onChange, error }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Choices</label>

      <div className={styles.control}>
        <textarea
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter each choice on a new line"
          className={`${styles.textarea} ${error ? styles.inputError : ""}`}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default ChoicesField;
