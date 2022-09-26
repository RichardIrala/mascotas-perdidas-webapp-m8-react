import { PetCard } from "components/PetCard";
import React from "react";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";
const ref = [1, 2, 3, 4, 5];

export const MyPetsReported = () => {
  return (
    <div className={styles.principalContainer}>
      <Title centred>Mascotas reportadas por ti</Title>
      <div className={styles.contenedor}>
        {ref?.map((pet, index) => {
          return (
            <PetCard
              description="sep"
              founded="true"
              idPet={1}
              last_location="Argentina"
              petName="Argentinito"
              pictureURL="https://res.cloudinary.com/richardiral/image/upload/v1662134184/h1mnrupvfcqtq4dif1x2.jpg"
              key={index}
              remove={"true"}
            />
          );
        })}
      </div>
      <GeneralText centred>No reportaste más mascotas</GeneralText>
    </div>
  );
};
