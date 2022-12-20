import "./index.scss";

function App() {
  return (
    <div className="app">
      <div className="app__header">Manifest Chutes and Ladders</div>
      <div className="app__main">
        <div className="board__wrapper">
          <div className="board">
            <div className="board__row"></div>
          </div>
        </div>
        <div className="tools">
          <div className="tools__current">Current Player | Dice</div>
          <div className="tools__players">Players</div>
          <div className="tools__history">Log</div>
        </div>
      </div>
    </div>
  );
}

export default App;
