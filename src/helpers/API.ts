const API_BASE_URL = "https://mascotas-perdidas-webapp-m7.herokuapp.com";
// const API_BASE_URL = "http://localhost:3000";

function path(path: string) {
  return API_BASE_URL + path;
}

export const API = {
  async authCheckEmail(email: string) {
    const raw = JSON.stringify({ email });
    let res = await fetch(path("/users/exist"), {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },
  async authLogin(email: string, password: string) {
    const raw = JSON.stringify({ email, password });
    let res = await fetch(path("/auth/token"), {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },
  async authRegister(email: string, password: string, firstName: string) {
    const raw = JSON.stringify({ email, password, firstName });

    const res = await fetch(path("/auth"), {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async changePassword(
    oldPassword: string,
    newPassword: string,
    token: string
  ) {
    const raw = JSON.stringify({ oldPassword, newPassword });

    const res = await fetch(path("/auth/change-password"), {
      method: "POST",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let status = res.status;
    let resjson = await res.json();

    /* Posibles respuestas si todo sale bien:
       "Contraseña erronea" || "Cambio de contraseña exitoso" : estos mensajes dentro de un objeto { message: respuesta }
       Si hay errores con el backend podrían haber otras respuestas.
    */

    return { status, resjson };
  },

  async mascotasCercaDe(lat: number, lng: number) {
    const res = await fetch(
      path(`/pets/cerca-de?lat=${lat.toString()}&lng=${lng.toString()}`)
    );

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async newPetLost(
    petInfo: {
      name: string;
      last_location: string;
      lat: number;
      lng: number;
      pictureURL: string;
      description?: string;
    },
    token: string
  ) {
    const { name, last_location, lat, lng, pictureURL, description } = petInfo;

    const raw = JSON.stringify({
      name,
      last_location,
      lat,
      lng,
      pictureURL,
      description,
    });

    const res = await fetch(path("/pets"), {
      method: "POST",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async modifyPetInformation(
    petInfo: {
      name: string;
      last_location: string;
      lat: number;
      lng: number;
      pictureURL: string;
    },
    petId: number,
    token: string
  ) {
    const { name, last_location, lat, lng, pictureURL } = petInfo;
    const raw = JSON.stringify({ last_location, lat, lng, name, pictureURL });

    const res = await fetch(path(`/pets/modify-pet?petId=${petId}`), {
      method: "PATCH",
      body: raw,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async petsReportedByUser(token: string) {
    const res = await fetch(path("/pets/reported-by-user"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async setPetFounded(petId: number, token: string) {
    const res = await fetch(path(`/pets/${petId}/founded`), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async sendReportEmail(petId: number, information: string, token: string) {
    const raw = JSON.stringify({ petId, information });

    const res = await fetch(path("/pets/petinfo/email"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: raw,
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async getPet(id: number) {
    const res = await fetch(path("/pets/" + id.toString()));

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },
};
