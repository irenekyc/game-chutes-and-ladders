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
      // const playerIds: string[] = gameData.players.map(
      //   (player: string) => player
      // );
      // const logsIds: string[] = gameData.logs.map((log: string) => log);

      // const players = await Promise.all(
      //   playerIds.map(async (playerId) => {
      //     try {
      //       const playerRef = doc(db, "players", playerId);
      //       const player = await getDoc(playerRef);
      //       return player.data();
      //     } catch {
      //       return null;
      //     }
      //   })
      // );
      // const logs = await Promise.all(
      //   logsIds.map(async (logId) => {
      //     try {
      //       const logRef = doc(db, "logs", logId);
      //       const log = await getDoc(logRef);
      //       return log.data();
      //     } catch {
      //       return null;
      //     }
      //   })
      // );
      console.log(gameData);
      return {
        logs: gameData.logs,
        players: gameData.players,
        round: gameData.round,
        name: gameData.name,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
    // do something
  }
};
export default fetchGame;
