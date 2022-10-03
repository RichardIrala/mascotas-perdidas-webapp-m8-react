import React from "react";
import styles from "./index.css";
interface LabelWithInputProps {
  children: string;
  inputName: string;
  inputType?: string;
  placeholder?: string;
  autocomplete?: "on" | "off";
}

export const LabelWithInput = (props: LabelWithInputProps) => {
  return (
    <label className={styles.label}>
      <span>{props.children.toUpperCase()}</span>
      <input
        className={styles.form__input}
        name={props.inputName}
        type={props.inputType || "text"}
        placeholder={props.placeholder}
        autoComplete={props.autocomplete}
      />
    </label>
  );
};
