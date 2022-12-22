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

const stepWithLadder = [1, 4, 8, 21, 28, 50, 71, 80];
const stepWithSnakes = [32, 36, 48, 62, 88, 95, 97];

function App() {
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
            <div className="tools__current__player">
              <img src={battleship} alt="" />
              <div className="tools__current__player__colorcode brown"></div>
              <div className="tools__current__player__name">Anuraag</div>
            </div>
            <div className="tools__current__player">
              <img src={car} alt="" />
              <div className="tools__current__player__colorcode orange"></div>
              <div className="tools__current__player__name">Rick</div>
            </div>
            <div className="tools__current__player">
              <img src={cat} alt="" />
              <div className="tools__current__player__colorcode yellow"></div>
              <div className="tools__current__player__name">Meenakshi</div>
            </div>
            <div className="tools__current__player">
              <img src={shoe} alt="" />
              <div className="tools__current__player__colorcode green"></div>
              <div className="tools__current__player__name">Ian</div>
            </div>
            <div className="tools__current__player">
              <img src={dog} alt="" />
              <div className="tools__current__player__colorcode light-green"></div>
              <div className="tools__current__player__name">Riley</div>
            </div>
            <div className="tools__current__player">
              <img src={hat} alt="" />
              <div className="tools__current__player__colorcode blue"></div>
              <div className="tools__current__player__name">Sabrina</div>
            </div>
            <div className="tools__current__player">
              <img src={wheelbarrow} alt="" />
              <div className="tools__current__player__colorcode purple"></div>
              <div className="tools__current__player__name">Irene</div>
            </div>
          </div>

          <div className="tools__players"></div>
          <div className="tools__history">Log</div>
        </div>
      </div>
    </div>
  );
}

export default App;
