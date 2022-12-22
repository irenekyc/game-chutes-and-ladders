import { useEffect, useState } from "react";
import "./index.scss";
import ladder from "./assets/ladder.png";
import snake from "./assets/snake.svg";
import battleship from "./assets/pieces/piece_battleship.png";
import car from "./assets/pieces/piece_car.png";
import dog from "./assets/pieces/piece_dog.png";
import cat from "./assets/pieces/piece_cat.png";
import hat from "./assets/pieces/piece_hat.png";
import shoe from "./assets/pieces/piece_shoe.png";
import wheelbarrow from "./assets/pieces/piece_wheelbarrow.png";

import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";
import Dice from "./components/dice";

export type Log = {
  id: string;
  name: string;
  dice: number;
  from: number;
  to: number;
  timestamp: number;
  round: number;
};

const sampleLogs: Log[] = [
  {
    id: uuidv4(),
    name: "anuraag",
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670656249000,
    round: 6,
  },
  {
    id: uuidv4(),
    name: "ian",
    dice: 1,
    from: 0,
    to: 38,
    timestamp: 1670656248000,
    round: 5,
  },
  {
    id: uuidv4(),
    name: "riley",
    dice: 5,
    from: 0,
    to: 5,
    timestamp: 1670656247000,
    round: 4,
  },
  {
    id: uuidv4(),
    name: "sabrina",
    dice: 4,
    from: 0,
    to: 14,
    timestamp: 1670656242000,
    round: 3,
  },
  {
    id: uuidv4(),
    name: "meenakshi",
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670651242000,
    round: 2,
  },
  {
    id: uuidv4(),
    name: "irene",
    dice: 6,
    from: 0,
    to: 6,
    timestamp: 1670651212000,
    round: 1,
  },
];

export type Player = {
  name: string;
  color: string;
  sequence: number;
  piece: string;
};

const players: Player[] = [
  {
    name: "Anuraag",
    color: "brown",
    sequence: 1,
    piece: battleship,
  },
  {
    name: "Rick",
    color: "orange",
    sequence: 2,
    piece: cat,
  },
  {
    name: "Meenakshi",
    color: "yellow",
    sequence: 3,
    piece: dog,
  },
  {
    name: "Ian",
    color: "green",
    sequence: 4,
    piece: car,
  },
  {
    name: "Sabrina",
    color: "light-green",
    sequence: 5,
    piece: hat,
  },
  {
    name: "Riley",
    sequence: 6,
    color: "blue",
    piece: shoe,
  },
  {
    name: "Irene",
    sequence: 7,
    color: "purple",
    piece: wheelbarrow,
  },
];

const stepWithLadder = [1, 4, 8, 21, 28, 50, 71, 80];
const stepWithSnakes = [32, 36, 48, 62, 88, 95, 97];

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [round, setRound] = useState<number | undefined>(undefined);
  const [historyLog, setHistoryLog] = useState<Log[]>([]);
  const [playersInSequence, setPlayersInSequence] = useState<Player[]>([]);

  useEffect(() => {
    // Get round number in
    setHistoryLog(sampleLogs);
    setRound(sampleLogs.length + 1);
    setIsLoaded(true);

    // get players sequence => find the last player
    setPlayersInSequence(players);
  }, []);

  const onRollHandler = (dice: number) => {
    const currentLog: Log = {
      id: uuidv4(),
      name: playersInSequence[0].name,
      from: 1, // previous log to
      dice,
      to: 1 + dice,
      timestamp: new Date().getTime(),
      round: round || 1,
    };
    setHistoryLog([...historyLog, currentLog]);
  };

  const onClickNextRoundHandler = () => {
    if (!round || playersInSequence.length === 0) return;
    setRound(round + 1);
    setPlayersInSequence([...playersInSequence.slice(1), playersInSequence[0]]);
  };
  if (!isLoaded)
    return (
      <div className="app">
        <p>Loading</p>
      </div>
    );

  return (
    <div className="app">
      <div className="app__header">
        <h1>Manifest Chutes and Ladders</h1>
      </div>
      <div className="app__main">
        <div className="board__wrapper">
          <div className="board">
            {[...Array(10).keys()].reverse().map((row) => (
              <div
                className={`board__row ${
                  row === 0 || row % 2 === 0
                    ? `board__row__even`
                    : `board__row__odd`
                }`}
                key={row}
              >
                {[...Array(10).keys()].map((i) => {
                  const number =
                    i === 9 ? `${row + 1}0` : `${row !== 0 ? row : ""}${i + 1}`;
                  return (
                    <div
                      className={`board__step ${
                        parseInt(number) % 2 === 0
                          ? "board__step__red"
                          : "board__step__white"
                      }`}
                      key={number}
                      data-step={number}
                    >
                      <span>{number}</span>
                      {stepWithLadder.includes(parseInt(number)) && (
                        <div className={`ladder ladder-${number}`}>
                          <img src={ladder} alt="ladder" />
                        </div>
                      )}
                      {stepWithSnakes.includes(parseInt(number)) && (
                        <div className={`snake snake-${number}`}>
                          <img src={snake} alt="snake" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="tools">
          <div className="tools__current">
            <span>Next:</span>
            {playersInSequence.slice(1).map((player) => (
              <div className="tools__current__player" key={player.name}>
                <img src={player.piece} alt="" />
                <div
                  className={`tools__current__player__colorcode ${player.color}`}
                ></div>
                <div className="tools__current__player__name">
                  {player.name}
                </div>
              </div>
            ))}
          </div>

          <div className="tools__players">
            <div className="tools__current__player">
              <img src={playersInSequence[0].piece} alt="" />
              <div
                className={`tools__current__player__colorcode ${playersInSequence[0].color}`}
              ></div>
              <div className="tools__current__player__name">
                {playersInSequence[0].name}
              </div>
            </div>
            <Dice
              onRollHandler={onRollHandler}
              round={round || 1}
              onClickNextRoundHandler={onClickNextRoundHandler}
            />
          </div>
          <div className="tools__history">
            <ul>
              {historyLog
                .sort((a, b) => b.round - a.round)
                .slice(0, 10)
                .map((log) => (
                  <li key={`${log.timestamp}-${log.name}`}>
                    [{format(new Date(log.timestamp), "Pp")}]: {log.name} threw{" "}
                    {log.dice}, moved from {log.from} to {log.to}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
