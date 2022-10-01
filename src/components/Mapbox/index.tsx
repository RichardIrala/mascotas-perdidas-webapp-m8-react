import React, { CSSProperties, useEffect, useState } from "react";
import pinIcon from "/assets/pin-icon.png";
import userUbicationIcon from "/assets/blue-circle-icon.png";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import styles from "./index.css";
import { API } from "helpers/API";
//Modificar, vamos a recibir ahora la ubicación del usuario a traves de props. Y agregamos un loader pre-carga del mapa
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmljaGFyZGlyYWxhIiwiYSI6ImNsNWc2ZHBpcDFpYTUzYm10MG1xaXVkZGYifQ.gYUtT27LEZY68W-sm7UoLA",
});

interface MapboxProps {
  width: string;
  height: string;
  goToElementId?: string;
  // Eliminar el petsNear y/o transformar el mismo en un solicitador de información sobre las mascotas, en este caso solo la latitud y longitud, aunque estaria bueno +
  petsNear?: boolean;
  //Tipar
  setReferenceForNewPet?;
  userUbication?: [number, number];
}

export const Mapbox = (props: MapboxProps) => {
  // Posteriormente este loc va a ser reemplazado por un customHook y recibira a las mascotas
  const [petsNear, setPetsNear]: any = useState();
  // const [userUbication, setUserUbication] = useState(null);
  const [referencePoint, setReferencePoint] = useState(null);

  useEffect(() => {
    function getGeolocation() {
      const aceptoGeoLoc = (position) => {
        console.log(position.coords.longitude, position.coords.latitude);

        if (!!props.petsNear) {
          console.log("pase por aca");
          API.mascotasCercaDe(
            position.coords.latitude,
            position.coords.longitude
          ).then((res) => {
            setPetsNear(res.resjson);
            // console.log(res.resjson, "<= Mascotas cerca");
          });
        }
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

  return (
    <div>
      {/* Mapa mapbox */}
      {props.goToElementId && (
        <button className={styles["absolute-position"]}>
          {/* Esto podría ser más concluso. Analizar y pensar posibles mejoras. */}
          <a href={"#" + props.goToElementId}>Ir debajo del mapa ⇩</a>
        </button>
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: props.height,
          width: props.width,
        }}
        center={referencePoint || props.userUbication}
        zoom={[14]}
        // Pendiente agregar el evento que me haga un console log de la ubicacion clickeada. A futuro esta recibira un action
        onClick={(event, mapData: any) => {
          if (Boolean(props.setReferenceForNewPet)) {
            const { lng, lat } = mapData.lngLat;
            // console.log(mapData);
            setReferencePoint([lng, lat]);
            props.setReferenceForNewPet({ lng, lat });
          }
        }}
      >
        {/* Averiguar qué es el Layer y Feature en mapbox */}
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[0, 0]} />
        </Layer>
        {/* Aca iria un map que cree cada market que se renderizara en el mapa  */}

        {!!props.userUbication ? (
          <Marker coordinates={props.userUbication} anchor="bottom">
            <div className={styles.userUbicationContainer}>
              <span>Tu</span>
              <img
                className={styles.userUbicationIcon}
                src={userUbicationIcon}
              />
            </div>
          </Marker>
        ) : (
          <div></div>
        )}
        {/* Esta lógica no me convence aunque funciona bien. Recibir las props//Mascotas desde fuera del componente */}
        {petsNear?.map((pet) => {
          let lat = Number(pet.lat);
          let lng = Number(pet.lng);
          return (
            <Marker key={pet.id} coordinates={[lng, lat]} anchor="bottom">
              <img className={styles.pinIcon} src={pinIcon} />
            </Marker>
          );
        })}
        {!!referencePoint ? (
          <Marker coordinates={referencePoint}>
            <img className={styles.userUbicationIcon} src={userUbicationIcon} />
          </Marker>
        ) : (
          <div></div>
        )}
      </Map>
    </div>
  );
};
