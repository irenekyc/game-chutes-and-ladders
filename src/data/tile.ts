export const stepWithLadder = [1, 4, 8, 21, 28, 50, 71, 80];
export const stepWithSnakes = [32, 36, 48, 62, 88, 95, 97];

export type TileSteps = {
  [destination: number]: number;
};

export const ladderTiles = {
  1: 38,
  4: 14,
  8: 30,
  21: 42,
  28: 76,
  50: 67,
  71: 92,
  80: 99,
};

export const snakeTiles = {
  32: 10,
  36: 6,
  97: 78,
  48: 26,
  62: 18,
  95: 56,
  88: 24,
};
