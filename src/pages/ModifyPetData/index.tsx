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
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "components/Loader";

// Transformar hooks en customHooks...
export const ModifyPetData = () => {
  const [pictureURL, setPictureUrl] = useState("");
  const search = useLocation().search;
  // petId 
  const idParam = parseInt(new URLSearchParams(search).get("id"));
  const [petData, setPetData] = useState(null);
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
    
    if (!(name || last_location || description || lat || lng || pictureURL)) {
      alert("Se requiere mínimo un dato");
      return;
    }

    const res = await API.modifyPetInformation(
      { name, last_location, lat, lng, pictureURL },
      petData.id,
      token
    );
    
    if (Boolean(res.resjson.message == "Datos actualizados")) {
      alert("Mascota modificada");
      navigate("/mis-mascotas-reportadas")
    } else {
        alert(res.resjson.message);
    }
  }

  useEffect(() => {
    API.getPet(idParam).then((res) => {
      if (res.resjson.id) {
        setPetData(res.resjson);
        console.log(res.resjson, "SOMOS LA MASCOTA")
      } else {
        console.log(res, "HUBO UN ERROR");
      }
    });
  }, [idParam]);
  
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
    if (petData) {
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
    }
  }, [petData]);

 
  
  if (Boolean(!petData)) {
    return <Loader />
  }
    if (Boolean(!petData?.id)) {
      return <h1>Hubo un problema solicitando la info de la mascota uhh</h1>;
    }

  return (
    <div>
      <div className={styles["principal-container"]} onSubmit={handleSubmit}>
        <div className={styles["title-container"]}>
          <Title centred>Modificar mascota</Title>
        </div>
        <img className={styles["old-pet-pic"]} src={petData.pictureURL} alt="foto de tu mascota" />
        <form className={styles["secundary-container"]}>
          <LabelWithInput inputName="name">Nombre de tu mascota</LabelWithInput>
          {!pictureURL && (
            <button
              className={styles.buttonToUploadImage}
              type="button"
              id="foto-input"
            >
              Cambiar foto
            </button>
          )}
          {pictureURL && <GeneralText centred>La nueva foto sera:</GeneralText>}
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
          <ButtonRose type="submit">Actualizar</ButtonRose>
        </form>
      </div>
    </div>
  );
};
