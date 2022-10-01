import { SignupForm } from "components/SignupForm";
import React from "react";
import { Title } from "ui/Title";
import styles from "./index.css";

export const Signup = () => {
  return (
    <div className={styles.principal_container}>
      <Title centred>Formulario de registro</Title>
      <SignupForm />
    </div>
  );
};
