import { updateDoc, doc } from "@firebase/firestore/lite";

import db from "./initDatabase";
import { Log } from "../typings/Log";

const updateLogsToFirebase = async (
  updatedLogs: Log[],
  round: number,
  gameId: string
) => {
  // update game info
  const gameRef = doc(db, "game-info", gameId);
  await updateDoc(gameRef, {
    round,
    logs: updatedLogs,
  });
};

export default updateLogsToFirebase;
