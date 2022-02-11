import { solutions } from "./solutions.js";
import { acceptableGuesses } from "./acceptableGuesses.js";
let correctAnswer = "";
const alphabet = /([A-Za-z])/g;
let currentGuess = 0;
let guess = "";
let answers = [];

function getWord() {
  const randomNumber = Math.floor(Math.random() * solutions.length);
  correctAnswer = solutions[randomNumber];
  console.log(correctAnswer);
}

getWord();

const buttons = document.querySelectorAll("[data-letter]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.letter === "backspace") {
      backspace();
      printGuessLetters(guess, false);
      return;
    }
    if (button.dataset.letter === "enter") {
      submitGuess(guess);
      return;
    }
    addLetter(button.dataset.letter);
    printGuessLetters(guess, true);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    backspace();
    printGuessLetters(guess, false);
    return;
  }
  if (event.key === "Enter") {
    submitGuess(guess);
    return;
  }
  if (event.key === "Escape") {
    guess = "";
  }
  if (event.key.match(alphabet) && event.key.length === 1) {
    addLetter(event.key.toLowerCase());
    printGuessLetters(guess, true);
  }
});

function addLetter(letter) {
  if (guess.length < 5) {
    guess += letter;
  }
}

function backspace() {
  guess = guess.slice(0, guess.length - 1);
}

function submitGuess(string) {
  if (!acceptableGuesses.includes(string)) {
    invalidGuess();
  }
  if (
    guess.length === 5 &&
    currentGuess <= 6 &&
    acceptableGuesses.includes(string)
  ) {
    addGuessToAnswers(string);
    currentGuess++;
    refreshBoard(answers);
    refreshKeyboard(answers);
    if (string === correctAnswer) {
      console.log("YOU WIN");
      gameOverPopup(true);
    }
    guess = "";
  }
  if (currentGuess === 6) {
    console.log("GAME OVER");
    gameOverPopup(false);
  }
  console.log(currentGuess);
}

function addGuessToAnswers(string) {
  for (let i = 0; i < string.length; i++) {
    const nullLetter = {
      letter: string[i],
      isCorrect: string[i] === correctAnswer.charAt(i),
      isInWord: correctAnswer.includes(string[i]),
    };
    answers.push(nullLetter);
  }
}

function refreshBoard(answerArray) {
  const tiles = document.querySelectorAll(".game-tile");
  answerArray.forEach((letter, index) => {
    tiles[index].classList.add("flip-in");
    setTimeout(() => {
      if (letter.isCorrect) {
        tiles[index].classList.add("correct");
      } else if (letter.isInWord && !letter.isCorrect) {
        tiles[index].classList.add("present");
      } else {
        tiles[index].classList.add("absent");
      }
    }, (index % 5) * 250 + 250);
  });
}

function refreshKeyboard(answerArray) {
  const buttons = document.querySelectorAll("[data-letter]");
  buttons.forEach((button) => {
    const answer = answerArray.find(
      (answer) => answer.letter === button.dataset.letter
    );
    if (answer && answer.isCorrect) {
      button.classList.add("correct");
    } else if (answer && answer.isInWord) {
      button.classList.add("present");
    } else if (answer) {
      button.classList.add("absent");
    }
  });
}

function invalidGuess() {
  const rows = document.querySelectorAll(".game-row");
  rows[currentGuess].classList.add("shake");
  setTimeout(() => {
    rows[currentGuess].classList.remove("shake");
  }, 600);
}

function resetBoard() {
  const tiles = document.querySelectorAll(".game-tile");
  tiles.forEach((tile, index) => {
    tile.classList.remove("flip-in");
    tile.classList.remove("correct");
    tile.classList.remove("present");
    tile.classList.remove("absent");
    tile.textContent = "";
  });
}

function resetKeyboard() {
  const buttons = document.querySelectorAll("[data-letter]");
  buttons.forEach((button) => {
    button.classList.remove("correct");
    button.classList.remove("present");
    button.classList.remove("absent");
  });
}

const button = document.querySelector(".play-again-btn");
const popup = document.querySelector(".game-over");
button.addEventListener("click", () => {
  currentGuess = 0;
  guess = "";
  answers = [];
  getWord();
  resetBoard();
  resetKeyboard();
  popup.classList.remove("popup");
});

function gameOverPopup(bool) {
  const text = document.querySelector(".winning-text");
  if (bool) {
    text.textContent = "You Win!";
  } else {
    text.textContent = "The answer was '" + correctAnswer + "'";
  }
  popup.classList.add("popup");
}

function printGuessLetters(string, bool) {
  const offset = currentGuess * 5;
  const tiles = document.querySelectorAll(".game-tile");
  for (let i = 0; i < 5; i++) {
    tiles[i + offset].textContent = string.charAt(i).toUpperCase();
  }
  if (bool) {
    tiles[string.length + offset - 1].classList.add("new-letter");
    setTimeout(() => {
      tiles[string.length + offset - 1].classList.remove("new-letter");
    }, 100);
  }
}

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

// settingsOpen.onclick = () => (settingsOverlay.style.display = "flex");
// settingsExit.onclick = () => (settingsOverlay.style.display = "none");
