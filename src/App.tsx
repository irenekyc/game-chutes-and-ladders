import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./page/game";
import Main from "./page/main";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/:gameId",
      element: <Game />,
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>Manifest Chutes and Ladders</h1>
      </div>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
