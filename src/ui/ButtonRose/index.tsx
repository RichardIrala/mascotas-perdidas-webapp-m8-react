import React from "react";
import styles from "./index.css";

interface ButtonProps {
  children: any;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  action?: Function;
}

export const ButtonRose = (props: ButtonProps) => {
  const typeProp = props.type ? props.type : "button";
  const actionExist = !!props.action;

  return (
    <button
      className={styles.button}
      type={typeProp}
      onClick={() => {
        props.action ? props.action() : null;
      }}
    >
      {props.children}
    </button>
  );
};
