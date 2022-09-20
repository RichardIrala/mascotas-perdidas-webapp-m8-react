import React from "react";
import styles from "./index.css";

interface TitleProps {
  children: String;
  centred?: Boolean;
}

export const Title = (props: TitleProps) => {
  const { centred } = props;
  return (
    <h2 className={styles.title + " " + (centred && styles.textCentred)}>
      {props.children}
    </h2>
  );
};
