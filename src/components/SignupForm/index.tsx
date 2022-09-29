import React, { FormEvent } from "react";
import styles from "./index.css";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import { useRecoilState } from "recoil";
import { userState } from "atoms";
import { useNavigate } from "react-router-dom";
import { API } from "helpers/API";

export const SignupForm = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  let { email } = userData;

  async function registerOnSubmit(event: FormEvent) {
    event.preventDefault();
    let $password = event.target["password"].value.trim();
    let $repeated_password = event.target["repeated_password"].value.trim();
    let $name = event.target["name"].value.trim();

    if ($password != $repeated_password) {
      alert("Las contraseñas no son idénticas");
    } else if (!$password || !email || !$name) {
      alert("Se requieren los campos completos");
    } else {
      let registerRes = await API.authRegister(email, $password, $name);

      if (!registerRes.resjson.email) {
        alert(registerRes.resjson.message);
        return;
      }
      const result = await API.authLogin(email, $password);

      if (!result.resjson.token) {
        alert("Quizá buscabas un bug, pero hoy no es el día :3. Te redigiremos al Login");
        navigate("/login");
      } else {
        setUserData({ ...userData, token: result.resjson.token });
        navigate("/welcome");
      }
    }
  }

  return (
    <form className={styles.principal_container} onSubmit={registerOnSubmit}>
      <LabelWithInput inputName="name" placeholder="fulanito">
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
      <ButtonRose type="submit">Registrarse</ButtonRose>
    </form>
  );
};
