import styles from "./Footer.module.scss";
import Button from "../shared/index";

type FooterProps = {
  isSubmitting: boolean;
  handleSubmit: () => void;
  handleClear: () => void;
};

const Footer: React.FC<FooterProps> = ({
  isSubmitting,
  handleSubmit,
  handleClear,
}) => {
  return (
    <div className={styles.footer}>
      <Button onClick={handleSubmit} isLoading={isSubmitting}>
        Submit
      </Button>
      <span className={styles.orText}>Or</span>
      <Button onClick={handleClear} variant="negative">
        Clear
      </Button>
    </div>
  );
};

export default Footer;
