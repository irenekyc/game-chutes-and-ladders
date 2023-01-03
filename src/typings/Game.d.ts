import { Player } from "./Player";
import { Log } from "./Log";

export type Game = {
  dataUrl: string;
  name: string;
  id: string;
  round: number;
  players: Player[];
  logs: Log[];
};
