import React, { FormEvent, useEffect, useState } from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { ButtonRose } from "ui/ButtonRose";
import styles from "./index.css";
import { useRecoilState } from "recoil";
import { userState } from "atoms";
import { API } from "helpers/API";
import { useNavigate } from "react-router-dom";

export const CheckEmailForm = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState();
  const [userData, setUserData] = useRecoilState(userState);

  async function checkEmailExistInDB(event: FormEvent) {
    event.preventDefault();
    let $email = event.target["email"].value.trim();

    if (!$email) {
      alert("Se requieren los campos completos");
    } else {
      let result = await API.authCheckEmail($email);

      switch (result.resjson.exist) {
        case true:
          setUserData({ ...userData, email: $email });
          navigate("/login");
          break;

        case false:
          setUserData({ ...userData, email: $email });
          navigate("/signup");
          break;

        default:
          alert("ocurrio un error");
      }
    }
  }

  return (
    <form className={styles.principal_container} onSubmit={checkEmailExistInDB}>
      <LabelWithInput
        inputName="email"
        inputType="email"
        placeholder="fulanito@ejemplo.com"
      >
        Email
      </LabelWithInput>
      <ButtonRose type="submit">Siguiente</ButtonRose>
    </form>
  );
};
