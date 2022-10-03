import { Header } from "components/Header";
import { Loader } from "components/Loader";
import { Mapbox } from "components/Mapbox";
import { PetCard } from "components/PetCard";
import { API } from "helpers/API";
import React, { useEffect, useState } from "react";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import styles from "./index.css";

export const Welcome = () => {
  const [petsNear, setPetsNear] = useState([]);
  const [userUbication, setUserUbication] = useState<[number, number] | null> (null);
  useEffect(() => {
    function getGeolocation() {
      const aceptoGeoLoc = (position) => {
        console.log(position.coords.longitude, position.coords.latitude);
        // Agregar aca un redirector hacia la ruta del welcome

        setTimeout(()=>{setUserUbication([position.coords.longitude, position.coords.latitude]);},3000)

        API.mascotasCercaDe(
          position.coords.latitude,
          position.coords.longitude
        ).then((res) => {
          setPetsNear(res.resjson);
        });
      };
      const noAceptoGeoLoc = () => {
        console.error("Acceso a la ubicación denegado");
      };

      if (!!navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          aceptoGeoLoc,
          noAceptoGeoLoc
        );
      }
    }
    getGeolocation();
  }, []);
  if (!Boolean(userUbication)) {
    return <Loader />;
  }
  return (
    <div>
      <Mapbox goToElementId="petCardsContainer" height="100vh" width="100%" petsNear={true} userUbication={userUbication}/>
      <div className={styles["title-container"]}>
        <Title centred>Mascotas perdidas cerca tuyo</Title>
      </div>
      <div className={styles["pet-cards"]} id="petCardsContainer">
        {/* Mascotas cercanas */}
        {petsNear?.map((item, index) => {
          return (
            <PetCard
              key={item.id}
              description={item.description}
              founded={item.founded}
              idPet={item.id}
              last_location={item.last_location}
              petName={item.name}
              pictureURL={item.pictureURL}
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
