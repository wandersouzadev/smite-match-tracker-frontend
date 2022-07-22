import { atom } from "recoil";

interface SmiteForm {
  step?: number;
  platform?: string;
  nameOrId?: string;
}

export const smiteFormState = atom<SmiteForm>({
  key: "SmiteForm",
  default: {
    step: 0,
    platform: "",
    nameOrId: ""
  }
});
