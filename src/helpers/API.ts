// const API_BASE_URL = "https://mascotas-perdidas-webapp-m7.herokuapp.com/";
const API_BASE_URL = "http://localhost:3000/";

function path(path: string) {
  return API_BASE_URL + path;
}

export const API = {
  async authCheckEmail(email: string) {
    const raw = JSON.stringify({ email });
    let res = await fetch(path("users/exist"), {
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
    let res = await fetch(path("auth/token"), {
      method: "POST",
      body: raw,
      headers: { "content-type": "application/json" },
    });

    let status = res.status;
    let resjson = await res.json();

    return { status, resjson };
  },
};
