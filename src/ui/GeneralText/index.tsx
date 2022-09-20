import React from "react";
import styles from "./index.css";

interface GeneralTextProps {
  children: String;
  centred?: Boolean;
}

export const GeneralText = (props: GeneralTextProps) => {
  const { centred } = props;
  return (
    <h2 className={styles.text + " " + (centred && styles.textCentred)}>
      {props.children}
    </h2>
  );
};
