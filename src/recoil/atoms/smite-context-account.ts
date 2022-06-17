import { SmitePlayer } from "@/typings/smite/player";
import { atom } from "recoil";

export const smiteAccountState = atom({
  key: "SmiteAccount",
  default: null as unknown as Partial<SmitePlayer>[] | null
});
