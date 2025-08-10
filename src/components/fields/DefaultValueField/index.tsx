import type { FieldProps } from "../../../types";
import styles from "../../FieldBuilder.module.scss";

const DefaultValueField: React.FC<FieldProps> = ({ value, onChange }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Default Value</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a default value"
        className={styles.input}
      />
    </div>
  );
};
export default DefaultValueField;
