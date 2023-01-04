import { setDoc, doc } from "@firebase/firestore/lite";

import db from "./initDatabase";

const startNewGame = async (
  gameName: string
): Promise<{ status: "success" | "failed"; gameId?: string }> => {
  const gameId = gameName.toLowerCase().split(" ").join("-");
  try {
    // add new game
    await setDoc(doc(db, "game-info", gameId), {
      name: gameName,
      id: gameId,
      round: 1,
    });
    return {
      status: "success",
      gameId,
    };
  } catch (err) {
    return {
      status: "failed",
    };
  }
};

export default startNewGame;
