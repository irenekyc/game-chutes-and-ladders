import { Game } from "../typings/Game";
import { players } from "./players";
import { sampleLogs } from "./logs";

export const game: Game = {
  dataUrl: "",
  name: "Manifest Round 1",
  id: "manifest-round-1",
  round: 8,
  players,
  logs: sampleLogs,
};
