import { FunctionComponent, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./PlayerInput.module.scss";
import { ImCheckboxChecked } from "react-icons/im";

interface PlayerInputProps {
  availableColors: string[];
  availablePieces: string[];
  addHandler: (color: string, name: string, piece: string) => void;
}

const PlayerInput: FunctionComponent<PlayerInputProps> = ({
  availableColors,
  availablePieces,
  addHandler,
}: PlayerInputProps) => {
  const [color, setColor] = useState<string | undefined>(availableColors[0]);
  const [piece, setPiece] = useState<string | undefined>(availablePieces[0]);
  const [name, setName] = useState<string | undefined>(undefined);
  const confirmHandler = () => {
    if (color && piece && name) {
      addHandler(color, name, piece);
      setName(undefined);
    }
  };
  return (
    <div className={styles.playerInput}>
      <div>
        <Dropdown onSelect={setPiece}>
          <Dropdown.Toggle bsPrefix={styles.playerDropdown__piece}>
            <img src={`/pieces/piece_${piece}.png`} alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {availablePieces.map((availablePiece) => (
              <Dropdown.Item eventKey={availablePiece} key={availablePiece}>
                {availablePiece}
              </Dropdown.Item>
            ))}
            <Dropdown.Item></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown onSelect={setColor}>
          <Dropdown.Toggle
            bsPrefix={styles.playerDropdown__color}
            style={{ background: color }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            {availableColors.map((availableColor) => (
              <Dropdown.Item eventKey={availableColor} key={availableColor}>
                {availableColor}
              </Dropdown.Item>
            ))}
            <Dropdown.Item></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        type="string"
        value={name || ""}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={confirmHandler}
        disabled={!color || !piece || !name || name.length <= 2}
      >
        <ImCheckboxChecked size={24} />
      </button>
    </div>
  );
};

export default PlayerInput;
