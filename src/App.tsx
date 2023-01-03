import { useEffect, useState, useRef } from "react";
import _groupBy from "lodash/groupBy";
import "./index.scss";

import { v4 as uuidv4 } from "uuid";

import Dice from "./components/dice";
import { Player } from "./typings/Player";
import Tile from "./components/tile";
import { players } from "./data/players";
import { Log } from "./typings/Log";
import { sampleLogs } from "./data/logs";
import getPlayerLastLog from "./helpers/getPlayerLastLog";
import getLastHistoryByPlayer from "./helpers/getLastHistoryByPlayer";
import checkDestination from "./helpers/checkDestination";
import LogList from "./components/log-list";
import { FaCrown } from "react-icons/fa";
import RolledDice from "./components/rolled-dice";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [round, setRound] = useState<number | undefined>(undefined);
  const [historyLog, setHistoryLog] = useState<Log[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | undefined>(
    undefined
  );
  const [currentWinner, setCurrentWinner] = useState<Player | undefined>(
    undefined
  );
  useEffect(() => {
    // Get round number in
    setHistoryLog(sampleLogs);
    setRound(sampleLogs.length + 1);
    setIsLoaded(true);

    setActivePlayer(players[0]);
  }, []);

  const onRollHandler = (dice: number) => {
    if (!activePlayer || !round) return;
    const from = getPlayerLastLog(historyLog, activePlayer.name).to || 1;
    const currentLog: Log = {
      id: uuidv4(),
      player: activePlayer,
      from,
      dice,
      ...checkDestination(from, dice),
      // (getPlayerLastLog(historyLog, playersInSequence[0].name).to || 1) +
      // dice,
      timestamp: new Date().getTime(),
      round: round || 1,
    };
    setHistoryLog([...historyLog, currentLog]);
    setRound(round + 1);
    setActivePlayer(undefined);
    if (historyRef.current) {
      historyRef.current.scrollBy(0, 50);
    }
  };

  const changeActivePlayer = (chosenPlayer: Player) =>
    setActivePlayer(chosenPlayer);

  useEffect(() => {
    if (historyLog.length === 0) return;
    const logs = getLastHistoryByPlayer(historyLog);
    const winner = logs.sort((a, b) => b.to - a.to)[0];
    setCurrentWinner(winner.player);
  }, [historyLog]);

  const historyRef = useRef<HTMLDivElement | null>(null);

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
          <div className="board__action">
            {activePlayer ? (
              <>
                <div className="tools__current__player">
                  <img src={activePlayer.piece} alt="" />
                  <div
                    className={`tools__current__player__colorcode ${activePlayer.color}`}
                  ></div>
                </div>
                <Dice onRollHandler={onRollHandler} round={round || 1} />
              </>
            ) : (
              <div>
                {historyLog[0].player.name} threw{" "}
                <RolledDice currentDice={historyLog[0].dice} size={20} /> ,
                moved to {historyLog[0].to}
                <p>Choose next player</p>
              </div>
            )}
          </div>

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
                      historyByPlayer={getLastHistoryByPlayer(historyLog)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="tools">
          <div className="tools__history" ref={historyRef}>
            <ul>
              {historyLog
                .sort((a, b) => a.round - b.round)
                .map((log) => (
                  <LogList log={log} key={log.round + "-" + log.player} />
                ))}
            </ul>
          </div>
          <div className="tools__players">
            {players.map((player) => (
              <div
                className={`tools__players__player ${
                  activePlayer && activePlayer.name === player.name
                    ? "tools__players__player__active"
                    : ""
                }`}
                key={player.name}
                onClick={() => changeActivePlayer(player)}
              >
                <div className="tools__current__player">
                  <img src={player.piece} alt="" />
                  <div
                    className={`tools__current__player__colorcode ${player.color}`}
                  ></div>
                </div>
                <div className="tools__players__player__name">
                  <span>{player.name}</span>
                  {currentWinner && currentWinner.name === player.name && (
                    <div className="tools__players__player__crown">
                      <FaCrown color="#BF913B" size="24" />
                    </div>
                  )}
                </div>
                <div className="tools__players__player__position">
                  {getPlayerLastLog(historyLog, player.name).to}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
