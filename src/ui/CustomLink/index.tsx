import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.css";

interface CustomLinkProps {
  to: any;
  children: String;
}

export const CustomLink = (props: CustomLinkProps) => {
  return (
    <Link to={props.to} className={styles["menu-burger--content"]}>
      {props.children}
    </Link>
  );
};
