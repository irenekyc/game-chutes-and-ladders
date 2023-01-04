import { updateDoc, doc } from "@firebase/firestore/lite";

import db from "./initDatabase";
import { Player } from "../typings/Player";

const savePlayerToFirebase = async (
  updatedPlayers: Player[],
  gameId: string
) => {
  // update game info
  const gameRef = doc(db, "game-info", gameId);
  await updateDoc(gameRef, {
    players: updatedPlayers,
  });
};

export default savePlayerToFirebase;
