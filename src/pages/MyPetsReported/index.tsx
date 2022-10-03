import { userState } from "atoms";
import { Loader } from "components/Loader";
import { PetCard } from "components/PetCard";
import { API } from "helpers/API";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";
const ref = [1, 2, 3, 4, 5];

export const MyPetsReported = () => {
  const [petsReported, setPetsReported] = useState(null);
  const { token } = useRecoilValue(userState);
  useEffect(() => {
    API.petsReportedByUser(token).then(({ resjson }) => {
      setPetsReported(resjson);
      console.log(resjson, "logMyPetsReported");
    });
  }, []);

  if (!Boolean(petsReported)) {
    return (<Loader />)
  }

  return (
    <div className={styles.principalContainer}>
      <Title centred>Mascotas reportadas por ti</Title>
      <div className={styles.contenedor}>
        {petsReported?.map((pet, index) => {
          return (
            <PetCard
              description={pet.description}
              founded={pet.founded}
              idPet={pet.id}
              last_location={pet.last_location}
              petName={pet.name}
              pictureURL={pet.pictureURL}
              key={pet.id}
              remove={true}
            />
          );
        })}
      </div>
      <GeneralText centred>No reportaste más mascotas</GeneralText>
    </div>
  );
};
