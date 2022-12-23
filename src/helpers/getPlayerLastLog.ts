import { Log } from "../typings/Log";

const getPlayerLastLog = (history: Log[], playerName: string): Log => {
  return history
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter((log) => log.player.name === playerName)[0];
};

export default getPlayerLastLog;
