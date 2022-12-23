import { FunctionComponent, useEffect, useState } from "react";
import _groupBy from "lodash/groupBy";
import { Player } from "../../typings/Player";
import styles from "./tile.module.scss";

import ladder from "../../assets/ladder.png";
import snake from "../../assets/snake.svg";
import { Log } from "../../typings/Log";
import { stepWithLadder, stepWithSnakes } from "../../data/tile";

interface TileProps {
  tileNumber: number;
  // players: Player[] | undefined;
  historyByPlayer: Log[];
}

const Tile: FunctionComponent<TileProps> = ({
  tileNumber,
  historyByPlayer,
}) => {
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);

  useEffect(() => {
    if (historyByPlayer.length === 0) return;
    if (tileNumber === 2) {
      console.log(historyByPlayer);
    }

    const thisTileLog = _groupBy(historyByPlayer, "to")[tileNumber];
    if (thisTileLog) {
      setPlayers(thisTileLog.map((log) => log.player));
    } else {
      setPlayers([]);
    }
  }, [historyByPlayer, tileNumber]);
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
