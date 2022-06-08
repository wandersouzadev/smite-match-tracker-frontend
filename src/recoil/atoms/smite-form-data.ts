import { atom } from "recoil";

interface SmiteFormData {
  step?: number;
  platform?: string;
  nameOrId?: string;
}

export const smiteFormDataState = atom<SmiteFormData>({
  key: "SmiteFormData",
  default: {
    step: 0,
    platform: "",
    nameOrId: ""
  }
});
