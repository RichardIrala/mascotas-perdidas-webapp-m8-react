import { atom } from "recoil";
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
