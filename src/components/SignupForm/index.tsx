import React from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import styles from "./index.css";

export const SignupForm = () => {
  return (
    <div className={styles.principal_container}>
      <LabelWithInput inputName="email" placeholder="fulanito">
        Nombre
      </LabelWithInput>
      <div className={styles.passwords_container}>
        <LabelWithInput
          inputName="password"
          autocomplete="off"
          inputType="password"
        >
          Contraseña
        </LabelWithInput>
        <LabelWithInput
          inputName="repeated_password"
          autocomplete="off"
          inputType="password"
        >
          Repetir contraseña
        </LabelWithInput>
      </div>
      <ButtonRose
        action={() => {
          alert("funcionando");
        }}
      >
        Siguiente
      </ButtonRose>
    </div>
  );
};
