import styles from "../../FieldBuilder.module.scss";

type Option = {
  value: string;
  label: string;
};

type LabeledSelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

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
