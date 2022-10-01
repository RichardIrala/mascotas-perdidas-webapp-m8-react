import { LabelWithInput } from "components/LabelWithInput";
import React from "react";
import { ButtonLogout } from "ui/ButtonLogout";
import { ButtonRose } from "ui/ButtonRose";
import { Title } from "ui/Title";
import styles from "./index.css";

export const MyProfile = () => {
  const formClasses = [
    "form",
    "d-flex",
    "flex-dir-column",
    "align-i-center",
    "gap20",
  ];
  function formClassesCSSModules(formClasses: any[]) {
    return formClasses.map((formClass) => styles[formClass]).join(" ");
  }
  const formClassesFinally = formClassesCSSModules(formClasses);

  return (
    <div>
      <div className={styles.titleContainer}>
        <Title centred>Mis datos</Title>
      </div>
      <form className={formClassesFinally}>
        <div className={styles.marginB50}>
          <LabelWithInput inputName="old_password">
            Contraseña actual
          </LabelWithInput>
        </div>
        <LabelWithInput inputName="new_password">
          Nueva contraseña
        </LabelWithInput>
        <LabelWithInput inputName="repeated_new_password">
          Repetir nueva contraseña
        </LabelWithInput>
        <ButtonRose type="submit">Cambiar contraseña</ButtonRose>
        <ButtonLogout />
      </form>
    </div>
  );
};
