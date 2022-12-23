import { FunctionComponent, useState, useEffect } from "react";
import {
  BsFillDice1Fill,
  BsFillDice2Fill,
  BsFillDice3Fill,
  BsFillDice4Fill,
  BsFillDice5Fill,
  BsFillDice6Fill,
} from "react-icons/bs";

interface DiceProps {
  round: number;
  onRollHandler: (dice: number) => void;
  onClickNextRoundHandler: () => void;
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
  const getNumberedDice = (diceNumber: number) => {
    switch (diceNumber) {
      case 1:
        return <BsFillDice1Fill size={40} key={`random-dice-${diceNumber}`} />;
      case 2:
        return <BsFillDice2Fill size={40} key={`random-dice-${diceNumber}`} />;
      case 3:
        return <BsFillDice3Fill size={40} key={`random-dice-${diceNumber}`} />;
      case 4:
        return <BsFillDice4Fill size={40} key={`random-dice-${diceNumber}`} />;
      case 5:
        return <BsFillDice5Fill size={40} key={`random-dice-${diceNumber}`} />;
      case 6:
        return <BsFillDice6Fill size={40} key={`random-dice-${diceNumber}`} />;
      default:
        return <BsFillDice1Fill size={40} key={`random-dice-${diceNumber}`} />;
    }
  };
  return <>{sequence.map((diceNumber) => getNumberedDice(diceNumber))}</>;
};

const Dice: FunctionComponent<DiceProps> = ({
  onRollHandler,
  round,
  onClickNextRoundHandler,
}: DiceProps) => {
  const [rollStatus, setrollStatus] = useState<RollStatus>(STATUS_DEFAULT);
  const [currentDice, setCurrentDice] = useState<number>(1);

  const rollingDice = async () => {
    return new Promise((resolve) => setTimeout(resolve, 300));
  };

  const rollDice = async () => {
    // some animations for dice rolling
    setrollStatus(STATUS_ROLLING);
    await rollingDice();

    // get random number from 1 to 6
    const randomNumber = Math.ceil(Math.random() * 6);

    setCurrentDice(randomNumber);
    setrollStatus(STATUS_ROLLED);
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
          <>
            {currentDice === 1 && <BsFillDice1Fill size={40} />}
            {currentDice === 2 && <BsFillDice2Fill size={40} />}
            {currentDice === 3 && <BsFillDice3Fill size={40} />}
            {currentDice === 4 && <BsFillDice4Fill size={40} />}
            {currentDice === 5 && <BsFillDice5Fill size={40} />}
            {currentDice === 6 && <BsFillDice6Fill size={40} />}
          </>
        )}
      </div>
      <button
        disabled={rollStatus === STATUS_ROLLING}
        onClick={
          rollStatus === STATUS_DEFAULT ? rollDice : onClickNextRoundHandler
        }
      >
        {rollStatus === STATUS_DEFAULT
          ? "Roll"
          : rollStatus === STATUS_ROLLING
          ? "Rolling"
          : "Next"}
      </button>
    </div>
  );
};

export default Dice;
