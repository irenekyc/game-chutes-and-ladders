import { Log } from "../typings/Log";

const getLastHistory = (logs: Log[]): Log | null => {
  if (logs.length === 0) return null;
  return logs.sort((a, b) => b.round - a.round)[0];
};

export default getLastHistory;
