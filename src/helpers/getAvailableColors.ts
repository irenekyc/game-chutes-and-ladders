import { colors } from "../data/players";
import { Player } from "../typings/Player";

const getAvailableColors = (players: Player[]): string[] => {
  if (players.length === 0) return colors;
  const takenColors: string[] = players.map((player) => player.color);
  return colors.filter((colors) => !takenColors.includes(colors));
};

export default getAvailableColors;
