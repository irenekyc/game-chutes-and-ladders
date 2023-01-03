import { useEffect, useState, useRef } from "react";
import _orderBy from "lodash/orderBy";
import _sortBy from "lodash/sortBy";
import "./index.scss";

import { v4 as uuidv4 } from "uuid";

import Dice from "./components/dice";
import { Player } from "./typings/Player";
import Tile from "./components/tile";
import { Log } from "./typings/Log";
import getPlayerLastLog from "./helpers/getPlayerLastLog";
import getLastHistoryByPlayer from "./helpers/getLastHistoryByPlayer";
import checkDestination from "./helpers/checkDestination";
import LogList from "./components/log-list";
import { FaCrown } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";

import RolledDice from "./components/rolled-dice";
import { game } from "./data/game";

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
    // load game data
    setHistoryLog(game.logs);
    setRound(game.round);
    setIsLoaded(true);
  }, []);

  const onRollHandler = (dice: number) => {
    if (!activePlayer || !round) return;
    const from = getPlayerLastLog(historyLog, activePlayer.name)
      ? getPlayerLastLog(historyLog, activePlayer.name).to
      : 0;
    const currentLog: Log = {
      id: uuidv4(),
      player: activePlayer,
      from,
      dice,
      ...checkDestination(from, dice),
      timestamp: new Date().getTime(),
      round: round || 1,
    };
    const updatedHistoryLog = [...historyLog];
    updatedHistoryLog.push(currentLog);
    setHistoryLog(updatedHistoryLog);

    setRound(round + 1);
    setActivePlayer(undefined);
    if (historyRef.current) {
      historyRef.current.scrollBy(0, 50);
    }
  };

  const changeActivePlayer = (chosenPlayer: Player) =>
    setActivePlayer(chosenPlayer);

  useEffect(() => {
    if (historyLog.length === 0) {
      setCurrentWinner(undefined);
      return;
    }
    const logs = getLastHistoryByPlayer(historyLog);
    const winner = logs.sort((a, b) => b.to - a.to)[0];
    if (winner.to > 0) {
      setCurrentWinner(winner.player);
    } else {
      setCurrentWinner(undefined);
    }
  }, [historyLog]);

  const historyRef = useRef<HTMLDivElement | null>(null);

  const onClickUndoHandler = (logId: string) => {
    if (historyLog.length === 0) return;

    const updatedHistoryLog = historyLog.filter((log) => log.id !== logId);
    setHistoryLog(updatedHistoryLog);
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
                {historyLog.length > 0 && (
                  <>
                    {historyLog[0].player.name} rolled{" "}
                    <RolledDice currentDice={historyLog[0].dice} size={20} /> ,
                    moved to {historyLog[0].to}
                  </>
                )}

                <p>
                  Choose {historyLog.length === 0 ? "first" : "next"} player
                </p>
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
              <li>Welcome</li>
              {historyLog
                .sort((a, b) => a.round - b.round)
                .map((log, index) => (
                  <li key={`${log.timestamp}-${log.player.name}`}>
                    <LogList log={log} key={log.round + "-" + log.player} />
                    {index === historyLog.length - 1 && (
                      <button onClick={() => onClickUndoHandler(log.id)}>
                        <IoArrowUndoSharp />
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          <div className="tools__players">
            {game.players.map((player) => (
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
                  {getPlayerLastLog(historyLog, player.name)
                    ? getPlayerLastLog(historyLog, player.name).to
                    : 0}
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
