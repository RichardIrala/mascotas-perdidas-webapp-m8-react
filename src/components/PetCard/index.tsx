import React from "react";
import { Link } from "react-router-dom";
import { Title } from "ui/Title";
import styles from "./index.css";
import editIcon from "/assets/edit-icon.png";
import okIcon from "/assets/ok-icon.png";

interface PetCardProps {
  idPet: string | number;
  petName: string;
  description: string;
  pictureURL: string;
  last_location: string;
  founded: string;
  remove?: boolean;
}

export const PetCard = (props: PetCardProps) => {
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
          <h3>Encontrado: {props.founded == "true" ? "Sí" : "No"}</h3>
        </div>
        {!props.remove ? (
          <div className={styles["info-container__report-info"]}>
            <div className={styles["container-null"]}></div>
            {/* cambiar a una etiqueta LINK */}
            <Link
              to={ "/reportar-informacion-de-mascota?id=" + props.idPet.toString() }
              className={styles["report-infopet__button"]}
            >
              REPORTAR INFORMACION
            </Link>
          </div>
        ) : (
          <div className={styles["info-container__report-info"]}>
            <Link to={ "/modificar-mascota?id=" + props.idPet.toString() }>
              <img className={styles["edit-pet"]} src={editIcon} />
            </Link>
            <img className={styles["pet-found"]} src={okIcon} />
          </div>
        )}
      </div>
    </div>
  );
};
