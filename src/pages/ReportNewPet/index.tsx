import React, { useState, useEffect, FormEvent } from "react";
import { LabelWithInput } from "components/LabelWithInput";
import { Mapbox } from "components/Mapbox";
import { ButtonRose } from "ui/ButtonRose";
import { GeneralText } from "ui/GeneralText";
import { Title } from "ui/Title";
import { Dropzone } from "dropzone";
import styles from "./index.css";
import { API } from "helpers/API";
import { useRecoilValue } from "recoil";
import { userState } from "atoms";
import { useUserUbication } from "hooks/useUserUbication";
import { useNavigate } from "react-router-dom";

// Transformar hooks en customHooks...
export const ReportNewPet = () => {
  const [pictureURL, setPictureUrl] = useState("");
  const { token } = useRecoilValue(userState);
  const navigate = useNavigate();
  const [userUbication, setUserUbication] = useState<[number, number] | null>(
    null
  );
  const [newPetUbication, setNewPetUbication] = useState({
    lat: NaN,
    lng: NaN,
  });

  function getQuerySelector(selector: string) {
    return window.document.querySelector(selector);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    /* pictureURL es un state que lleva los datos de la foto elegida en el form
    aqui iria lo del mapbox */
    const name = event.target["name"].value;
    const last_location = event.target["last_location"].value;
    const description = event.target["description"].value;
    const { lat, lng } = newPetUbication;
    if (
      !(
        name &&
        last_location &&
        description &&
        lat &&
        lng &&
        pictureURL &&
        token
      )
    ) {
      alert("FALTAN CASILLEROS POR LLENAR");
      return;
    }

    const res = await API.newPetLost(
      { name, last_location, lat, lng, pictureURL, description },
      token
    );
    console.log(res, "problems?");
    // Crear una redirección y un recargar información para un átomo que guarde los datos de las mascotas reportadas :3
    if (Boolean(res.resjson.pet.id)) {
      alert("Mascota creada con éxito");
      navigate("/welcome")
    }
  }

  useEffect(() => {
    if (!!pictureURL) {
      /* El query 'foto_pet' foto de la mascota. Estas acciones condicionan la 
      imagen que aparece en el Front luego de seleccionarla en los archivos de la pc */
      getQuerySelector(".foto_pet").classList.add("bordes");
      getQuerySelector(".dz-success-mark").classList.add("display-none");
      getQuerySelector(".dz-details").classList.add("display-none");
      getQuerySelector(".dz-error-mark").classList.add("display-none");
    }
  }, [pictureURL]);

  useEffect(() => {
    useUserUbication(setUserUbication);
    const foto_pet = getQuerySelector(".foto_pet");
    console.log(foto_pet, "soy fotopet");
    console.log("corriendo");
    const myDropzone = new Dropzone("#foto-input", {
      url: "/falsa",
      autoProcessQueue: false,
      maxFiles: 1,
      thumbnailWidth: 335,
      thumbnailHeight: 335,
      //   addRemoveLinks: true,
      previewsContainer: foto_pet,
    });
    console.log(myDropzone);
    myDropzone.on("thumbnail", function (file) {
      setPictureUrl(file.dataURL);
    });
  }, []);

  return (
    <div>
      <div className={styles["principal-container"]} onSubmit={handleSubmit}>
        <div className={styles["title-container"]}>
          <Title centred>Reportar mascota perdida</Title>
        </div>
        <form className={styles["secundary-container"]}>
          <LabelWithInput inputName="name">Nombre</LabelWithInput>
          {!pictureURL && (
            <button
              className={styles.buttonToUploadImage}
              type="button"
              id="foto-input"
            >
              Subir foto
            </button>
          )}
          <div className={"foto_pet"}></div>
          <LabelWithInput inputName="last_location">
            Visto ultima vez en
          </LabelWithInput>
          {userUbication && (
            <Mapbox
              height="335px"
              width="335px"
              setReferenceForNewPet={setNewPetUbication}
              userUbication={userUbication}
            />
          )}
          <GeneralText centred>
            Necesitamos que también marques el punto en el mapa
          </GeneralText>
          <LabelWithInput inputName="description">Descripción</LabelWithInput>
          <ButtonRose type="submit">Publicar</ButtonRose>
        </form>
      </div>
    </div>
  );
};
