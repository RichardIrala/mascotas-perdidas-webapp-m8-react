import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.css";

interface CustomLinkProps {
  to: any;
  children: String;
  onClick?: () => void;
}

export const CustomLink = (props: CustomLinkProps) => {
  return (
    <Link to={props.to} className={styles["menu-burger--content"]} onClick={props.onClick}>
      {props.children}
    </Link>
  );
};
