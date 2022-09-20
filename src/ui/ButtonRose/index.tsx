import React from "react";
import styles from "./index.css";

interface ButtonProps {
  children: any;
  type?: "button" | "submit" | "reset";
  action?: Function;
}

export const ButtonRose = (props: ButtonProps) => {
  const typeProp = props.type ? props.type : "button";
  const actionExist = props.action ? true : false;
  return !actionExist ? (
    <button className={styles.button} type={typeProp}>
      {props.children}
    </button>
  ) : (
    <button
      className={styles.button}
      type={typeProp}
      onClick={() => {
        props.action();
      }}
    >
      {props.children}
    </button>
  );
};
