import { userState } from "atoms";
import { API } from "helpers/API";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Title } from "ui/Title";
import styles from "./index.css";
import editIcon from "/assets/edit-icon.png";
import okIcon from "/assets/ok-icon.png";

interface PetCardProps {
  idPet: number;
  petName: string;
  description: string;
  pictureURL: string;
  last_location: string;
  founded: boolean;
  remove?: boolean;
}

export const PetCard = (props: PetCardProps) => {
  const { token } = useRecoilValue(userState);

  return (
    <div className={styles["card-container"]}>
      <div className={styles["pet-pic-container"]}>
        <img
          className={styles["pet-pic-container--img"]}
          src={props.pictureURL}
          alt="Mascota"
        />
      </div>
      <div className={styles["info-container"]}>
        <div className={styles["pet-textinfo-container"]}>
          <Title>{props.petName}</Title>
          <h3>{props.last_location}</h3>
          <h3>Encontrado: {Boolean(props.founded) ? "Sí" : "No"}</h3>
        </div>
        {!props.remove ? (
          <div className={styles["info-container__report-info"]}>
            <div className={styles["container-null"]}></div>
            {/* cambiar a una etiqueta LINK */}
            <Link
              to={
                "/reportar-informacion-de-mascota?id=" + props.idPet.toString()
              }
              className={styles["report-infopet__button"]}
            >
              REPORTAR INFORMACION
            </Link>
          </div>
        ) : (
          <div className={styles["info-container__report-info"]}>
            <Link to={"/modificar-mascota?id=" + props.idPet.toString()}>
              <img className={styles["edit-pet"]} src={editIcon} />
            </Link>
            <img
              className={styles["pet-found"]}
              onClick={async () => {
                const res = await API.setPetFounded(props.idPet, token);

                if (
                  res.resjson.message ===
                  "Nos alegra saber que encontraron a tu mascota"
                ) {
                  alert("Nos alegra saber que encontraste a tu mascota :3");
                  //Al colocar la mascota como Encontrada se reinicia la página para ver los cambios ya hechos.
                  window.location.reload();
                } else alert(res.resjson.message);
              }}
              src={okIcon}
            />
          </div>
        )}
      </div>
    </div>
  );
};
