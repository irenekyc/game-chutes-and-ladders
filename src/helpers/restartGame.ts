import { updateDoc, doc } from "@firebase/firestore/lite";
import db from "./initDatabase";

const restartGame = async (gameId: string) => {
  // update game info
  const gameRef = doc(db, "game-info", gameId);
  await updateDoc(gameRef, {
    round: 1,
    logs: [],
  });
};

export default restartGame;
