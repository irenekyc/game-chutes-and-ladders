import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchAllGames from "../../helpers/fetchAllGames";

const Main: FunctionComponent = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [gameList, setGameList] = useState<
    {
      gameName: string;
      gameId: string;
    }[]
  >([]);

  const fetchData = async () => {
    const games = await fetchAllGames();
    setGameList(games);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return <>Loading....</>;
  }
  return (
    <>
      {gameList.map((game) => (
        <Link to={`/${game.gameId}`} key={game.gameId}>
          {game.gameName}
        </Link>
      ))}
    </>
  );
};

export default Main;
