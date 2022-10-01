import { petReportInfoIdState, petReportInfoState } from "atoms";
import { LabelWithInput } from "components/LabelWithInput";
import { usePetInfoForEmail } from "hooks/usePetInfoForEmail";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ButtonRose } from "ui/ButtonRose";
import { Title } from "ui/Title";
import styles from "./index.css";

export const ReportPetInformation = () => {
  const search = useLocation().search;
  const titulo = "cuentanos más sobre ";
  const idParam = new URLSearchParams(search).get("id");
  const id = parseInt(idParam);
  // const { id } = useQuery();
  const petInfoForEmail = usePetInfoForEmail(id);
  // useEffect temporal
  useEffect(() => {
    console.log(petInfoForEmail, "SOY toda la info");
  }, [petInfoForEmail]);
  

  if (!Boolean(petInfoForEmail)) {
    return <h1>Hubo un error... Esta mascota posiblemente no existe</h1>;
  }

  if (!Boolean(petInfoForEmail?.id)) {
    return <h1>cargando...</h1>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["little-card-container"]}>
        <Title centred>{titulo + petInfoForEmail.name}</Title>
        <img className={styles["pet-pic"]} src={petInfoForEmail.pictureURL} />
      </div>
      <form className={styles["form"]}>
        <LabelWithInput inputName="description" autocomplete={"off"}>
          Información que sepas
        </LabelWithInput>
        <ButtonRose type="submit">Enviar</ButtonRose>
      </form>
    </div>
  );
};
