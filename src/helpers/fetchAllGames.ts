import { collection, getDocs } from "@firebase/firestore/lite";
import db from "./initDatabase";

const fetchAllGames = async (): Promise<
  {
    gameId: string;
    gameName: string;
  }[]
> => {
  let gameList: {
    gameId: string;
    gameName: string;
  }[] = [];
  try {
    const gameRef = collection(db, "game-info");
    const gameData = await getDocs(gameRef);
    gameData.forEach((gameEntry) => {
      const game = {
        gameId: gameEntry.data().id,
        gameName: gameEntry.data().name,
      };
      gameList.push(game);
    });
    return gameList;
  } catch (err) {
    return gameList;
  }
};
export default fetchAllGames;
