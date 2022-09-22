import React from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import styles from "./index.css";

export const LoginForm = () => {
  return (
    <div className={styles.principal_container}>
      <LabelWithInput
        inputName="password"
        autocomplete="off"
        inputType="password"
      >
        Contraseña
      </LabelWithInput>
      <ButtonRose
        action={() => {
          alert("funcionando");
        }}
      >
        Confirmar
      </ButtonRose>
    </div>
  );
};
