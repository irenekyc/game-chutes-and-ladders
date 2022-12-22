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
import { BsFillDice1Fill } from "react-icons/bs";
import format from "date-fns/format";
import { v4 as uuidv4 } from "uuid";

export type Log = {
  id: string;
  name: string;
  dice: number;
  from: number;
  to: number;
  timestamp: number;
  round: number;
};

const sampleLogs: Log[] = [
  {
    id: uuidv4(),
    name: "anuraag",
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670656249000,
    round: 6,
  },
  {
    id: uuidv4(),
    name: "ian",
    dice: 1,
    from: 0,
    to: 38,
    timestamp: 1670656248000,
    round: 5,
  },
  {
    id: uuidv4(),
    name: "riley",
    dice: 5,
    from: 0,
    to: 5,
    timestamp: 1670656247000,
    round: 4,
  },
  {
    id: uuidv4(),
    name: "sabrina",
    dice: 4,
    from: 0,
    to: 14,
    timestamp: 1670656242000,
    round: 3,
  },
  {
    id: uuidv4(),
    name: "meenakshi",
    dice: 2,
    from: 0,
    to: 2,
    timestamp: 1670651242000,
    round: 2,
  },
  {
    id: uuidv4(),
    name: "irene",
    dice: 6,
    from: 0,
    to: 6,
    timestamp: 1670651212000,
    round: 1,
  },
];

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
            <span>Next:</span>
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

          <div className="tools__players">
            <div className="tools__current__player">
              <img src={battleship} alt="" />
              <div className="tools__current__player__colorcode brown"></div>
              <div className="tools__current__player__name">Anuraag</div>
            </div>
            <div className="tools__players__dice__div">
              <div className="tools__players__dice">
                <BsFillDice1Fill size={40} />
              </div>
              <button>Roll</button>
            </div>
          </div>
          <div className="tools__history">
            <ul>
              {sampleLogs
                .sort((a, b) => b.round - a.round)
                .map((log) => (
                  <li key={`${log.timestamp}-${log.name}`}>
                    [{format(new Date(log.timestamp), "Pp")}]: {log.name} threw{" "}
                    {log.dice}, moved from {log.from} to {log.to}
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
