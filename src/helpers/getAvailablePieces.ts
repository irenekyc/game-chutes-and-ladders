import { pieces } from "../data/players";
import { Player } from "../typings/Player";

const getAvailablePieces = (players: Player[]): string[] => {
  if (players.length === 0) return pieces;
  const takenPieces: string[] = players.map((player) => player.piece);
  return pieces.filter((piece) => !takenPieces.includes(piece));
};

export default getAvailablePieces;
