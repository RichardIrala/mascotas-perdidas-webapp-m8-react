import { CheckEmailForm } from "components/CheckEmailForm";
import React from "react";
import { Title } from "ui/Title";
import styles from "./index.css";

export const CheckEmail = () => {
  return (
    <div className={styles.principal_container}>
      <Title centred>Ingresar</Title>
      <CheckEmailForm />
    </div>
  );
};
