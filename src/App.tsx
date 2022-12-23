import { useEffect, useState } from "react";
import _groupBy from "lodash/groupBy";
import "./index.scss";

import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";

import Dice from "./components/dice";
import { Player } from "./typings/Player";
import Tile from "./components/tile";
import { players } from "./data/players";
import { Log } from "./typings/Log";
import { sampleLogs } from "./data/logs";

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
      player: playersInSequence[0],
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
                    <Tile
                      tileNumber={parseInt(number)}
                      key={number}
                      players={
                        _groupBy(sampleLogs, "to")[number]
                          ? _groupBy(sampleLogs, "to")[number].map(
                              (log) => log.player
                            )
                          : []
                      }
                    />
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
                  <li key={`${log.timestamp}-${log.player.name}`}>
                    [{format(new Date(log.timestamp), "Pp")}]: {log.player.name}{" "}
                    threw {log.dice}, moved from {log.from} to {log.to}
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
