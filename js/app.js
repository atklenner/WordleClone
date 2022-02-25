import { solutions } from "./solutions.js";
import { GameBoard } from "./GameBoard.js";
import "./viewport.js";
const alphabet = /([A-Za-z])/g;

// to see the game copied from the source
// https://mottaquikarim.github.io/wordle_timemachine/v2.html?d=2021-06-19

const gameboard = new GameBoard(getWord());

function getWord() {
  const randomNumber = Math.floor(Math.random() * solutions.length);
  return solutions[randomNumber];
}

const buttons = document.querySelectorAll("[data-letter]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.letter === "backspace") {
      gameboard.backspace();
      gameboard.printGuessLetters(gameboard.guess, false);
      return;
    }
    if (button.dataset.letter === "enter") {
      gameboard.submitGuess(gameboard.guess);
      return;
    }
    gameboard.addLetter(button.dataset.letter);
    gameboard.printGuessLetters(guess, true);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    gameboard.backspace();
    gameboard.printGuessLetters(gameboard.guess, false);
    return;
  }
  if (event.key === "Enter") {
    gameboard.submitGuess(gameboard.guess);
    return;
  }
  if (event.key === "Escape") {
    gameboard.guess = "";
  }
  if (event.key.match(alphabet) && event.key.length === 1) {
    gameboard.addLetter(event.key.toLowerCase());
    gameboard.printGuessLetters(gameboard.guess, true);
  }
});

const button = document.querySelector(".play-again-btn");
const popup = document.querySelector(".game-over");
button.addEventListener("click", () => {
  gameboard.resetBoard(getWord());
  popup.classList.remove("popup");
});

const howToPlayOverlay = document.querySelector(".how-to-play-overlay");
const howToPlayOpen = document.querySelector(".how-to-play-open");
const howToPlayExit = document.querySelector(".how-to-play-exit");
const tiles = document.querySelectorAll(".animate");
const backgrounds = ["correct", "present", "absent"];

howToPlayOpen.onclick = () => {
  howToPlayOverlay.classList.add("slide-in");
  setTimeout(() => {
    tiles.forEach((tile, index) => {
      tile.classList.add(backgrounds[index]);
    });
  }, 350);
  setTimeout(() => {
    tiles.forEach((tile) => {
      tile.classList.add("flip-in");
    });
  }, 100);
};

howToPlayExit.onclick = () => {
  howToPlayOverlay.classList.add("slide-out");
  howToPlayOverlay.classList.remove("slide-in");
  tiles.forEach((tile, index) => {
    tile.classList.remove("flip-in");
    tile.classList.remove(backgrounds[index]);
  });
  setTimeout(() => {
    howToPlayOverlay.classList.remove("slide-out");
  }, 100);
};

// const settingsOverlay = document.querySelector(".settings-overlay");
// const settingsOpen = document.querySelector(".settings-open");
// const settingsExit = document.querySelector(".settings-exit");

// settingsOpen.onclick = () => settingsOverlay.classList.add("slide-in");
// settingsExit.onclick = () => {
//   settingsOverlay.classList.add("slide-out");
//   settingsOverlay.classList.remove("slide-in");
//   settingsOverlay.classList.remove("slide-out");
// };
