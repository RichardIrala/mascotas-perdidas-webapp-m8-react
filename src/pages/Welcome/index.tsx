import { Header } from "components/Header";
import { Mapbox } from "components/Mapbox";
import { PetCard } from "components/PetCard";
import React, { useState } from "react";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";
const cosas = [1, 2, 3, 4, 5];
//Pagina en proceso
export const Welcome = () => {
  return (
    <div>
      <Mapbox />

      {/* fin del mapa */}
      <div className={styles["title-container"]}>
        <Title centred>Mascotas perdidas cerca tuyo</Title>
      </div>
      <div className={styles["pet-cards"]} id="petCardsContainer">
        {cosas?.map((item, index) => {
          return (
            <PetCard
              key={index}
              description="si"
              founded="true"
              idPet={"4"}
              last_location="corrientes"
              petName="Alfredo"
              pictureURL="https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg"
            />
          );
        })}
      </div>
      <div className={styles["padding-b20"]}>
        <GeneralText centred>No hay más mascotas cerca</GeneralText>
      </div>
    </div>
  );
};
