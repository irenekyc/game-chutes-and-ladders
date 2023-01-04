import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import fetchAllGames from "../../helpers/fetchAllGames";
import startNewGame from "../../helpers/startNewGame";

const Main: FunctionComponent = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [gameList, setGameList] = useState<
    {
      gameName: string;
      gameId: string;
    }[]
  >([]);
  const [sameGameNameError, setSameGameNameError] = useState<boolean>(false);
  const [dataSaveError, setDataSaveError] = useState<boolean>(false);
  const [newGameName, setNewGameName] = useState<string>("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const games = await fetchAllGames();
    setGameList(games);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onInputGameName = (e: any) => {
    const updateGameName = e.target.value;
    if (dataSaveError) {
      setDataSaveError(false);
    }
    if (
      gameList.filter(
        ({ gameName }) =>
          gameName.toLowerCase() === updateGameName.toLowerCase()
      ).length > 0
    ) {
      setSameGameNameError(true);
    } else {
      setSameGameNameError(false);
    }
    setNewGameName(updateGameName);
  };

  const onClickStart = async () => {
    const res = await startNewGame(newGameName);
    if (res.status !== "failed" && res.gameId) {
      setNewGameName("");
      return navigate(`/${res.gameId}`);
    } else {
      setDataSaveError(true);
    }
  };

  if (!isLoaded) {
    return <>Loading....</>;
  }
  return (
    <div className="app__main__game-list">
      {gameList.map((game) => (
        <Link to={`/${game.gameId}`} key={game.gameId}>
          {game.gameName}
        </Link>
      ))}
      <br />
      <p>Add New Game</p>
      <div className="app__main__game-list__add">
        <div className="app__main__game-list__add__input">
          <input
            type="text"
            onChange={onInputGameName}
            value={newGameName}
            placeholder={"Game Name"}
          />
          {sameGameNameError && (
            <small className="error-text">Game name need be different</small>
          )}
          {dataSaveError && (
            <small className="error-text">
              Unexpected error, please try later
            </small>
          )}
        </div>

        <button
          disabled={sameGameNameError || newGameName.length < 3}
          onClick={onClickStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Main;
