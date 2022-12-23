import { FunctionComponent } from "react";
import { Player } from "../../typings/Player";
import styles from "./tile.module.scss";

import ladder from "../../assets/ladder.png";
import snake from "../../assets/snake.svg";

const stepWithLadder = [1, 4, 8, 21, 28, 50, 71, 80];
const stepWithSnakes = [32, 36, 48, 62, 88, 95, 97];

interface TileProps {
  tileNumber: number;
  players: Player[] | undefined;
}

const Tile: FunctionComponent<TileProps> = ({ tileNumber, players }) => {
  console.log(tileNumber, players);
  return (
    <div
      className={`board__step ${
        tileNumber % 2 === 0 ? "board__step__red" : "board__step__white"
      }`}
      key={tileNumber}
      data-step={tileNumber}
    >
      <span>{tileNumber}</span>
      {players && (
        <div className={styles.tile__playerRow}>
          {players.map((player) => (
            <div
              className={styles.tile__playerRow__piece}
              key={`chess-player-${player.name}`}
            >
              <img
                src={player.piece}
                alt={""}
                style={{ background: player.color }}
              />
            </div>
          ))}
        </div>
      )}
      {stepWithLadder.includes(tileNumber) && (
        <div className={`ladder ladder-${tileNumber}`}>
          <img src={ladder} alt="ladder" />
        </div>
      )}
      {stepWithSnakes.includes(tileNumber) && (
        <div className={`snake snake-${tileNumber}`}>
          <img src={snake} alt="snake" />
        </div>
      )}
    </div>
  );
};

export default Tile;
