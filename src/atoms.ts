import { API } from "helpers/API";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface userProps {
  username: string;
  email: string;
  token: string;
}

export const userState = atom<userProps>({
  key: "userState",
  default: {
    username: "",
    email: "",
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const petReportInfoIdState = atom<number>({
  key: "petReportInfoIdState",
  default: NaN,
});

export const petReportInfoState = selector({
  key: "petReportInfoSelector",
  get: async ({ get }) => {
    const petId = get(petReportInfoIdState);
    if (Boolean(petId)) {
      const res = await API.getPet(petId);
      return res.resjson;
    }
  },
});
