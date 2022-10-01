// :3
//userUbication sera un hook setter
export function useUserUbication(setUserUbication) {
  const aceptoGeoLoc = (position) => {
    setUserUbication({
      lng: position.coords.longitude,
      lat: position.coords.latitude,
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
