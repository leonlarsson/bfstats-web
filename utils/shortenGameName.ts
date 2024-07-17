export const shortenGameName = (game: string) =>
  ({
    "Battlefield 2042": "BF2042",
    "Battlefield V": "BFV",
    "Battlefield 1": "BF1",
    "Battlefield Hardline": "BFH",
    "Battlefield 4": "BF4",
    "Battlefield 3": "BF3",
    "Battlefield Bad Company 2": "BFBC2",
    "Battlefield 2": "BF2",
  })[game] || game;
