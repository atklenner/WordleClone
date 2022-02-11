import { solutions } from "./solutions.js"; // only want to bother with the official solutions not all possible guesses
const randomNumber = Math.floor(Math.random() * solutions.length);
const correctAnswer = solutions[randomNumber];
const alphabet = /([A-Za-z])/g;
let currentGuess = 0;
let guess = "";
const answers = [];

console.log(correctAnswer);

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
  if (guess.length === 5 && currentGuess <= 5 && solutions.includes(string)) {
    addGuessToAnswers(string);
    currentGuess++;
    refreshBoard(answers);
    refreshKeyboard(answers);
    if (string === correctAnswer) {
      console.log("YOU WIN");
    }
    guess = "";
  } else if (currentGuess === 5) {
    console.log("GAME OVER");
  } else if (!solutions.includes(string)) {
    console.log("guess is not valid");
  } else {
    console.log("guess is too short");
  }
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

// howToPlayOpen.onclick = () => (howToPlayOverlay.style.display = "flex");
// howToPlayExit.onclick = () => (howToPlayOverlay.style.display = "none");
howToPlayOpen.onclick = () => howToPlayOverlay.classList.add("slide-in");
howToPlayExit.onclick = () => howToPlayOverlay.classList.remove("slide-in");

const settingsOverlay = document.querySelector(".settings-overlay");
const settingsOpen = document.querySelector(".settings-open");
const settingsExit = document.querySelector(".settings-exit");

settingsOpen.onclick = () => (settingsOverlay.style.display = "flex");
settingsExit.onclick = () => (settingsOverlay.style.display = "none");
