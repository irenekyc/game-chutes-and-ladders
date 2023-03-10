import { FunctionComponent, useState, useEffect } from "react";
import {
  BsFillDice1Fill,
  BsFillDice2Fill,
  BsFillDice3Fill,
  BsFillDice4Fill,
  BsFillDice5Fill,
  BsFillDice6Fill,
} from "react-icons/bs";
import RolledDice from "../rolled-dice";

interface DiceProps {
  round: number;
  onRollHandler: (dice: number) => void;
}

const STATUS_DEFAULT = "STATUS_DEFAULT";
const STATUS_ROLLING = "STATUS_ROLLING";
const STATUS_ROLLED = "STATUS_ROLLED";

export type RollStatus =
  | typeof STATUS_DEFAULT
  | typeof STATUS_ROLLED
  | typeof STATUS_ROLLING;

const RollingDice = () => {
  const [sequence, setSequence] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  useEffect(() => {
    setSequence([
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
      Math.ceil(Math.random() * 6),
    ]);
  }, []);

  const getNumberedDice = (diceNumber: number, index: number) => {
    switch (diceNumber) {
      case 1:
        return (
          <BsFillDice1Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      case 2:
        return (
          <BsFillDice2Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      case 3:
        return (
          <BsFillDice3Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      case 4:
        return (
          <BsFillDice4Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      case 5:
        return (
          <BsFillDice5Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      case 6:
        return (
          <BsFillDice6Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
      default:
        return (
          <BsFillDice1Fill
            size={40}
            key={`random-dice-${diceNumber}-${index}`}
          />
        );
    }
  };
  return (
    <>
      {sequence.map((diceNumber, index) => getNumberedDice(diceNumber, index))}
    </>
  );
};

const Dice: FunctionComponent<DiceProps> = ({
  onRollHandler,
  round,
}: DiceProps) => {
  const [rollStatus, setrollStatus] = useState<RollStatus>(STATUS_DEFAULT);
  const [currentDice, setCurrentDice] = useState<number>(1);

  const rollingDice = async () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const rollDice = async () => {
    // some animations for dice rolling
    setrollStatus(STATUS_ROLLING);
    await rollingDice();

    // get random number from 1 to 6
    const randomNumber = Math.ceil(Math.random() * 6);

    setCurrentDice(randomNumber);
    onRollHandler(randomNumber);
  };

  useEffect(() => {
    setrollStatus(STATUS_DEFAULT);
  }, [round]);

  return (
    <div className="tools__players__dice__div">
      <div className="tools__players__dice">
        {" "}
        {rollStatus === STATUS_ROLLING ? (
          <div className="tools__players__dice__rolling">
            {/* Get random sequence of 6 */}
            <RollingDice />
          </div>
        ) : (
          <RolledDice currentDice={currentDice} />
        )}
      </div>
      <button disabled={rollStatus === STATUS_ROLLING} onClick={rollDice}>
        Roll
      </button>
    </div>
  );
};

export default Dice;
