import { Log } from "../typings/Log";
import _groupBy from "lodash/groupBy";

const getLastHistoryByPlayer = (history: Log[]): Log[] => {
  const logsByPlayer = _groupBy(
    history.sort((a, b) => b.timestamp - a.timestamp),
    "player.name"
  );
  return Object.values(
    _groupBy(
      history.sort((a, b) => b.timestamp - a.timestamp),
      "player.name"
    )
  ).map((logs) => logs[0]);
};

export default getLastHistoryByPlayer;
