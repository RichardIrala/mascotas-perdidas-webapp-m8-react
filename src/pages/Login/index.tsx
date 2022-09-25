import { LoginForm } from "components/LoginForm";
import React from "react";
import { Title } from "ui/Title";
import styles from "./index.css";

export const Login = () => {
  return (
    <div className={styles.principal_container}>
      <Title centred>Ingresar</Title>
      <LoginForm />
    </div>
  );
};
