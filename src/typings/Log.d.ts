export type Log = {
  id: string;
  player: Player;
  dice: number;
  from: number;
  to: number;
  timestamp: number;
  round: number;
  ladder?: {
    from: number;
    to: number;
  };
  snake?: {
    from: number;
    to: number;
  };
};
