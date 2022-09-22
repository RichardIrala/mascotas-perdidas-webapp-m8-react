import React from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import styles from "./index.css";

export const CheckEmailForm = () => {
  return (
    <div className={styles.principal_container}>
      <LabelWithInput inputName="email" placeholder="fulanito@hotmail.com">
        Email
      </LabelWithInput>
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
