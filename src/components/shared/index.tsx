import React from "react";
import styles from "./Button.module.scss";
import type { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading = false,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

export default Button;
