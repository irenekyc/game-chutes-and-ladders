import { FunctionComponent } from "react";
import { useEffect, useState, useRef } from "react";
import _orderBy from "lodash/orderBy";
import _sortBy from "lodash/sortBy";
import { v4 as uuidv4 } from "uuid";
import { FaCrown } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

import Dice from "../../components/dice";
import { Player } from "../../typings/Player";
import Tile from "../../components/tile";
import { Log } from "../../typings/Log";
import getPlayerLastLog from "../../helpers/getPlayerLastLog";
import getLastHistoryByPlayer from "../../helpers/getLastHistoryByPlayer";
import checkDestination from "../../helpers/checkDestination";
import LogList from "../../components/log-list";
import RolledDice from "../../components/rolled-dice";
import fetchGame from "../../helpers/fetchGame";
import PlayerInput from "../../components/player-input";
import savePlayerToFirebase from "../../helpers/savePlayerToFirebase";

import getAvailableColors from "../../helpers/getAvailableColors";
import getAvailablePieces from "../../helpers/getAvailablePieces";
import updateLogsToFirebase from "../../helpers/updateLogsToFirebase";
import restartGame from "../../helpers/restartGame";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Game: FunctionComponent = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [round, setRound] = useState<number | undefined>(undefined);
  const [historyLog, setHistoryLog] = useState<Log[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player | undefined>(
    undefined
  );
  const [currentWinner, setCurrentWinner] = useState<Player | undefined>(
    undefined
  );
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameId, setGameId] = useState<string | undefined>();
  const [gameName, setGameName] = useState<string | undefined>(undefined);
  const [gameError, setGameError] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const { gameId: gameIdParams } = useParams();

  const loadData = async (id: string) => {
    if (!id) return;
    const gameData = await fetchGame(id);

    setIsLoaded(true);
    if (!gameData) {
      setGameError(true);
    } else {
      setPlayers(gameData.players);
      setHistoryLog(gameData.logs);
      setRound(gameData.round);
      setGameName(gameData.name);
      setGameId(id);
    }
    // scroll to bottom
    if (historyRef.current && historyListRef.current) {
      historyRef.current.scrollTo(0, historyListRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    if (!gameIdParams) return;
    // load game data
    loadData(gameIdParams);
  }, [gameIdParams]);

  const onRollHandler = (dice: number) => {
    if (!activePlayer || !round || !gameId) return;
    const from = getPlayerLastLog(historyLog, activePlayer.name)
      ? getPlayerLastLog(historyLog, activePlayer.name).to
      : 0;
    const currentLog: Log = {
      id: uuidv4(),
      player: activePlayer,
      playerName: activePlayer.name,
      from,
      dice,
      ...checkDestination(from, dice),
      timestamp: new Date().getTime(),
      round: round || 1,
    };
    const updatedHistoryLog = [...historyLog];
    updatedHistoryLog.push(currentLog);
    setHistoryLog(updatedHistoryLog);
    updateLogsToFirebase(updatedHistoryLog, round + 1, gameId);
    setRound(round + 1);
    setActivePlayer(undefined);
    // scroll to bottom
    if (historyRef.current && historyListRef.current) {
      historyRef.current.scrollBy(0, 100);
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
    if (winner.to === 100) {
      setGameFinished(true);
      setCurrentWinner(winner.player);
    } else if (winner.to > 0) {
      setCurrentWinner(winner.player);
    } else {
      setCurrentWinner(undefined);
    }
  }, [historyLog]);

  const historyRef = useRef<HTMLDivElement | null>(null);
  const historyListRef = useRef<HTMLUListElement | null>(null);

  const onClickUndoHandler = (logId: string) => {
    if (historyLog.length === 0 || !round || !gameId) return;
    const updatedHistoryLog = historyLog.filter((log) => log.id !== logId);
    updateLogsToFirebase(updatedHistoryLog, round, gameId);
    setHistoryLog(updatedHistoryLog);
  };

  const renderAction = (): JSX.Element => {
    if (activePlayer) {
      return (
        <>
          <div className="tools__current__player">
            <img src={`/pieces/piece_${activePlayer.piece}.png`} alt="" />
            <div
              className={`tools__current__player__colorcode ${activePlayer.color}`}
            ></div>
          </div>
          <Dice onRollHandler={onRollHandler} round={round || 1} />
        </>
      );
    }
    if (players.length === 0) {
      return <p>Add Players</p>;
    }
    if (historyLog.length > 0) {
      return (
        <p>
          {historyLog[0].playerName} rolled{" "}
          <RolledDice currentDice={historyLog[0].dice} size={20} /> , moved to{" "}
          {historyLog[0].to}
          <p>Choose next player</p>
        </p>
      );
    }
    if (historyLog.length === 0 && players.length > 0) {
      return <p>Choose first player</p>;
    }
    return <></>;
  };

  const savePlayer = (color: string, name: string, piece: string) => {
    if (!gameId) return;
    const updatedPlayers: Player[] = [
      ...players,
      {
        name,
        color,
        piece,
      },
    ];
    savePlayerToFirebase(updatedPlayers, gameId);
    setPlayers(updatedPlayers);
  };

  const onClickRestartGame = () => {
    if (!gameId) return;
    setHistoryLog([]);
    restartGame(gameId);
    setGameFinished(false);
  };

  if (!isLoaded)
    return (
      <div className="app">
        <p>Loading</p>
      </div>
    );

  if (gameError) {
    return (
      <div className="app">
        <p>Error</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }
  return (
    <>
      {currentWinner && gameFinished && (
        <Modal show centered>
          <Modal.Body className="app__modal__body">
            <p>{currentWinner.name} WON!</p>
            <button onClick={onClickRestartGame}>Play Again</button>
          </Modal.Body>
        </Modal>
      )}

      <div className="app__main__game-name-div">
        <h3>{gameName} </h3>{" "}
        {historyLog.length > 0 && (
          <button onClick={onClickRestartGame}>Restart Game</button>
        )}
      </div>

      <div className="app__main">
        <div className="board__wrapper">
          <div className="board__action">{renderAction()}</div>

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
            <ul ref={historyListRef}>
              <li>Welcome</li>
              {historyLog
                .sort((a, b) => a.round - b.round)
                .map((log, index) => (
                  <li key={`${log.timestamp}-${log.playerName}`}>
                    <LogList log={log} key={log.round + "-" + log.playerName} />
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
                  <img src={`/pieces/piece_${player.piece}.png`} alt="" />
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
            {players.length < 8 && (
              <PlayerInput
                availableColors={getAvailableColors(players)}
                availablePieces={getAvailablePieces(players)}
                addHandler={savePlayer}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
