import { userState } from "atoms";
import { LabelWithInput } from "components/LabelWithInput";
import { API } from "helpers/API";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ButtonLogout } from "ui/ButtonLogout";
import { ButtonRose } from "ui/ButtonRose";
import { Title } from "ui/Title";
import styles from "./index.css";

export const MyProfile = () => {
  const { token } = useRecoilValue(userState);
  const navigate = useNavigate()
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const $old_password = event.target["old_password"].value;
    const $new_password = event.target["new_password"].value;
    const $repeated_new_password = event.target["repeated_new_password"].value;
    if (!Boolean($old_password && $new_password && $repeated_new_password)) {
      alert("faltan casillas por completar");
    } else if ($new_password !== $repeated_new_password) {
      alert("las contraseñas no coinciden");
    } else {
      // fetch hacia el backend
      const res = await API.changePassword($old_password, $new_password, token);
      if (res.resjson.message === "Cambio de contraseña exitoso") {
        alert("Cambio de contraseña exitoso.");
        navigate("/welcome");
      } else if (res.resjson.message === "Contraseña erronea") {
        alert("Contraseña erronea");
      } else {
        alert("Puede que haya habido un error.");
      }
        // respuesta
        console.log(res);
    }
  }

  return (
    <div>
      <div className={styles.titleContainer}>
        <Title centred>Mis datos</Title>
      </div>
      <form className={formClassesFinally} onSubmit={handleSubmit}>
        <div className={styles.marginB50}>
          <LabelWithInput inputName="old_password" inputType="password">
            Contraseña actual
          </LabelWithInput>
        </div>
        <LabelWithInput inputName="new_password" inputType="password">
          Nueva contraseña
        </LabelWithInput>
        <LabelWithInput inputName="repeated_new_password" inputType="password">
          Repetir nueva contraseña
        </LabelWithInput>
        <ButtonRose type="submit">Cambiar contraseña</ButtonRose>
        <ButtonLogout />
      </form>
    </div>
  );
};
