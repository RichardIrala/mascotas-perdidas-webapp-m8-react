import { userState } from "atoms";
import { LabelWithInput } from "components/LabelWithInput";
import { Loader } from "components/Loader";
import { API } from "helpers/API";
import { usePetInfoForEmail } from "hooks/usePetInfoForEmail";
import React, { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ButtonRose } from "ui/ButtonRose";
import { Title } from "ui/Title";
import styles from "./index.css";

export const ReportPetInformation = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  const search = useLocation().search;
  const titulo = "cuentanos más sobre ";
  const idParam = new URLSearchParams(search).get("id");
  const id = parseInt(idParam);
  const petInfoForEmail = usePetInfoForEmail(id);
 
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const $description = event.target["description"].value;
    if (!Boolean($description)) {
      alert("Faltan casillas por completar");
    } else {
      const res = await API.sendReportEmail(
        petInfoForEmail.id,
        $description,
        userData.token
      );
      
      if (res.status === 200) {
        alert("Mensaje enviado");
        navigate("/welcome");
      } else {
        alert("Hubo un error");
      }
    }
  }

  if (!Boolean(petInfoForEmail)) {
    return <h1>Hubo un error... Esta mascota posiblemente no existe</h1>;
  }

  if (!Boolean(petInfoForEmail?.id)) {
    return <Loader />;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["little-card-container"]}>
        <Title centred>{titulo + petInfoForEmail.name}</Title>
        <img className={styles["pet-pic"]} src={petInfoForEmail.pictureURL} />
      </div>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <LabelWithInput inputName="description" autocomplete={"off"}>
          Información que sepas
        </LabelWithInput>
        <ButtonRose type="submit">Enviar</ButtonRose>
      </form>
    </div>
  );
};
