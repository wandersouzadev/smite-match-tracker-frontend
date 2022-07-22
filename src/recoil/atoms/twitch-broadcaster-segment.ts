import { SmitePlayer } from "@/typings/smite/player";
import { atom } from "recoil";

export const broadcasterSegmentState = atom({
  key: "BroadcasterSegment",
  default: null as unknown as Partial<SmitePlayer>[] | null
});
