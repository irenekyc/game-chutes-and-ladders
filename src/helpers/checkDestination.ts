import { ladderTiles, snakeTiles } from "../data/tile";

const checkDestination = (
  from: number,
  dice: number
): {
  to: number;
  ladder?: {
    from: number;
    to: number;
  };
  snake?: {
    from: number;
    to: number;
  };
} => {
  const destination: number = from + dice;
  // check if it hit ladder
  if (ladderTiles[destination as keyof typeof ladderTiles]) {
    return {
      to: ladderTiles[destination as keyof typeof ladderTiles],
      ladder: {
        from: destination,
        to: ladderTiles[destination as keyof typeof ladderTiles],
      },
    };
  }
  // check if it hit snakes
  if (snakeTiles[destination as keyof typeof snakeTiles]) {
    return {
      to: snakeTiles[destination as keyof typeof snakeTiles],
      snake: {
        from: destination,
        to: snakeTiles[destination as keyof typeof snakeTiles],
      },
    };
  }

  return { to: destination };
};

export default checkDestination;
