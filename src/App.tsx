import "./index.scss";
import ladder from "./assets/ladder.png";
const stepWithLadder = [1, 4, 8, 21, 28, 50, 71, 80];

function App() {
  return (
    <div className="app">
      <div className="app__header">Manifest Chutes and Ladders</div>
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
                      {number}
                      {stepWithLadder.includes(parseInt(number)) && (
                        <div className={`ladder ladder-${number}`}>
                          <img src={ladder} alt="ladder" />
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
          <div className="tools__current">Current Player | Dice</div>
          <div className="tools__players">Players</div>
          <div className="tools__history">Log</div>
        </div>
      </div>
    </div>
  );
}

export default App;
