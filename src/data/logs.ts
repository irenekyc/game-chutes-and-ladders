import { Log } from "../typings/Log";
import { anuraag, ian, irene, meenakshi, riley, sabrina } from "./players";
import { v4 as uuidv4 } from "uuid";

export const sampleLogs: Log[] = [
  {
    id: uuidv4(),
    player: anuraag,
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670656249000,
    round: 6,
  },
  {
    id: uuidv4(),
    player: ian,
    dice: 1,
    from: 0,
    to: 38,
    timestamp: 1670656248000,
    round: 5,
  },
  {
    id: uuidv4(),
    player: riley,
    dice: 5,
    from: 0,
    to: 5,
    timestamp: 1670656247000,
    round: 4,
  },
  {
    id: uuidv4(),
    player: sabrina,
    dice: 4,
    from: 0,
    to: 14,
    timestamp: 1670656242000,
    round: 3,
  },
  {
    id: uuidv4(),
    player: meenakshi,
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670651242000,
    round: 2,
  },
  {
    id: uuidv4(),
    player: irene,
    dice: 6,
    from: 0,
    to: 6,
    timestamp: 1670651212000,
    round: 1,
  },
];
