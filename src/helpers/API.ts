// const API_BASE_URL = "https://mascotas-perdidas-webapp-m7.herokuapp.com/";
const API_BASE_URL = "http://localhost:3000";

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
    console.log(raw);

    const res = await fetch(path("/auth"), {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },

  async mascotasCercaDe(lat: number, lng: number) {
    const res = await fetch(path(`/pets/cerca-de?lat=${lat}&lng=${lng}`));

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

  async petsReportedByUser(token: string) {
    const res = await fetch(path("/pets/reported-by-user"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },
};
