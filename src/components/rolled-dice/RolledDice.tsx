import { FunctionComponent } from "react";
import {
  BsFillDice1Fill,
  BsFillDice2Fill,
  BsFillDice3Fill,
  BsFillDice4Fill,
  BsFillDice5Fill,
  BsFillDice6Fill,
} from "react-icons/bs";

interface RolledDiceProps {
  currentDice: number;
  size?: number;
}

const RolledDice: FunctionComponent<RolledDiceProps> = ({
  currentDice,
  size,
}: RolledDiceProps) => {
  return (
    <>
      {currentDice === 1 && <BsFillDice1Fill size={size || 40} />}
      {currentDice === 2 && <BsFillDice2Fill size={size || 40} />}
      {currentDice === 3 && <BsFillDice3Fill size={size || 40} />}
      {currentDice === 4 && <BsFillDice4Fill size={size || 40} />}
      {currentDice === 5 && <BsFillDice5Fill size={size || 40} />}
      {currentDice === 6 && <BsFillDice6Fill size={size || 40} />}
    </>
  );
};

export default RolledDice;
