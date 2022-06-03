import { atom } from "recoil";

interface SmiteAccount {
  Id: string;
  hz_player_name: string;
  Team_name: string;
  Message: string;
  Platform: string;
  Last_Login_Datetime: string;
}

export const smiteAccountState = atom({
  key: "SmiteAccount",
  default: null as unknown as Partial<SmiteAccount>[] | null
});
