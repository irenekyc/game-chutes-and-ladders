import { doc, getDoc } from "@firebase/firestore/lite";
import { Log } from "../typings/Log";
import { Player } from "../typings/Player";
import db from "./initDatabase";

const fetchGame = async (
  gameId: string
): Promise<{
  players: Player[];
  logs: Log[];
  round: number;
  name: string;
} | null> => {
  try {
    const gameRef = doc(db, "game-info", gameId);
    const game = await getDoc(gameRef);
    if (game.exists()) {
      const gameData = game.data();
      return {
        logs: gameData.logs || [],
        players: gameData.players || [],
        round: gameData.round,
        name: gameData.name,
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
    // do something
  }
};
export default fetchGame;
