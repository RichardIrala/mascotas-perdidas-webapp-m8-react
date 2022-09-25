import React, { useEffect } from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import styles from "./index.css";
import { useRecoilState } from "recoil";
import { userState } from "atoms";
import { useNavigate } from "react-router-dom";
import { API } from "helpers/API";

export const LoginForm = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  let { email } = userData;

  async function login(event) {
    event.preventDefault();
    let $password = event.target["password"].value.trim();

    if (!$password || !email) {
      alert("Se requieren los campos completos");
    } else {
      let result = await API.authLogin(email, $password);

      if (!result.resjson.token) {
        console.error("contraseña incorrecta");
      } else {
        setUserData({ ...userData, token: result.resjson.token });
        navigate("/welcome");
      }
    }
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <form
      className={styles.principal_container}
      onSubmit={(e) => {
        login(e);
      }}
    >
      <LabelWithInput
        inputName="password"
        autocomplete="off"
        inputType="password"
      >
        Contraseña
      </LabelWithInput>
      <ButtonRose type="submit">Confirmar</ButtonRose>
    </form>
  );
};
