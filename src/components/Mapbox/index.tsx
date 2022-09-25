import React, { CSSProperties, useEffect, useState } from "react";
import pinIcon from "/assets/pin-icon.png";
import userUbicationIcon from "/assets/blue-circle-icon.png";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import styles from "./index.css";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmljaGFyZGlyYWxhIiwiYSI6ImNsNWc2ZHBpcDFpYTUzYm10MG1xaXVkZGYifQ.gYUtT27LEZY68W-sm7UoLA",
});

interface MapboxProps {
  width: string;
  height: string;
  goToElementId?: string;
}

export const Mapbox = (props: MapboxProps) => {
  // Posteriormente este loc va a ser reemplazado por un customHook y recibira a las mascotas
  const [loc, setLoc] = useState([-37, -20]);
  const [userUbication, setUserUbication] = useState(null);
  const [referencePoint, setReferencePoint] = useState(null);

  useEffect(() => {
    function getGeolocation() {
      const aceptoGeoLoc = (position) => {
        console.log(position.coords.longitude, position.coords.latitude);
        // Agregar aca un redirector hacia la ruta del welcome
        setTimeout(() => {
          setUserUbication([
            position.coords.longitude,
            position.coords.latitude,
          ]);
        }, 3000);
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
      {props.goToElementId ? (
        <button className={styles["absolute-position"]}>
          {/* Esto podría ser más concluso. Analizar y pensar posibles mejoras. */}
          <a href={"#" + props.goToElementId}>Ir debajo del mapa ⇩</a>
        </button>
      ) : (
        ""
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: props.height,
          width: props.width,
        }}
        center={referencePoint || userUbication || [0, 0]}
        zoom={!!userUbication ? [14] : [0]}
        // Pendiente agregar el evento que me haga un console log de la ubicacion clickeada. A futuro esta recibira un action
        onClick={(event, mapData: any) => {
          const { lng, lat } = mapData.lngLat;
          console.log(mapData);
          setReferencePoint([lng, lat]);
        }}
      >
        {/* Averiguar qué es el Layer y Feature en mapbox */}
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[0, 0]} />
        </Layer>
        {/* Aca iria un map que cree cada market que se renderizara en el mapa  */}
        <Marker coordinates={loc} anchor="bottom">
          <img className={styles.pinIcon} src={pinIcon} />
        </Marker>
        {!!userUbication ? (
          <Marker coordinates={userUbication} anchor="bottom">
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
