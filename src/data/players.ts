import car from "../assets/pieces/piece_car.png";
import dog from "../assets/pieces/piece_dog.png";
import cat from "../assets/pieces/piece_cat.png";
import hat from "../assets/pieces/piece_hat.png";
import shoe from "../assets/pieces/piece_shoe.png";

import { Player } from "../typings/Player";

export const anuraag = {
  name: "Anuraag",
  color: "brown",
  sequence: 1,
  piece: "/pieces/piece_battleship.png",
};
export const rick = {
  name: "Rick",
  color: "orange",
  sequence: 2,
  piece: "/pieces/piece_cat.png",
};

export const meenakshi = {
  name: "Meenakshi",
  color: "yellow",
  sequence: 3,
  piece: "/pieces/piece_dog.png",
};

export const ian = {
  name: "Ian",
  color: "green",
  sequence: 4,
  piece: "/pieces/piece_car.png",
};

export const sabrina = {
  name: "Sabrina",
  color: "light-green",
  sequence: 5,
  piece: "/pieces/piece_hat.png",
};

export const riley = {
  name: "Riley",
  sequence: 6,
  color: "blue",
  piece: "/pieces/piece_shoe.png",
};

export const irene = {
  name: "Irene",
  sequence: 7,
  color: "purple",
  piece: "/pieces/piece_wheelbarrow.png",
};

export const players: Player[] = [
  anuraag,
  rick,
  meenakshi,
  ian,
  sabrina,
  riley,
  irene,
];
