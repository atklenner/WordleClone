const dictionary = ["penis", "farts", "boobs", "butts", "pimps"];
const correctAnswer = "penis";
const alphabet = /([A-Za-z])/g;
let currentGuess = 0;
let guess = "";
const answers = [];

const buttons = document.querySelectorAll("[data-letter]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.letter === "backspace") {
      backspace();
      printGuessLetters(guess);
      return;
    }
    if (button.dataset.letter === "enter") {
      submitGuess(guess);
      return;
    }
    addLetter(button.dataset.letter);
    printGuessLetters(guess);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    backspace();
    printGuessLetters(guess);
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
    printGuessLetters(guess);
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
  if (guess.length === 5 && currentGuess <= 5 && dictionary.includes(string)) {
    addGuessToAnswers(string);
    currentGuess++;
    refreshBoard(answers);
    if (string === correctAnswer) {
      console.log("YOU WIN");
    }
    guess = "";
  } else if (currentGuess === 5) {
    console.log("GAME OVER");
  } else if (!dictionary.includes(string)) {
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
  tiles.forEach((tile) => {
    tile.textContent = "";
  });
  answerArray.forEach((letter, index) => {
    if (letter.isCorrect) {
      tiles[index].classList.add("correct");
    } else if (letter.isInWord && !letter.isCorrect) {
      tiles[index].classList.add("present");
    } else {
      tiles[index].classList.add("absent");
    }
    tiles[index].textContent = letter.letter.toUpperCase();
  });
}

function printGuessLetters(string) {
  const offset = currentGuess * 5;
  const tiles = document.querySelectorAll(".game-tile");
  for (let i = 0; i < 5; i++) {
    tiles[i + offset].textContent = string.charAt(i).toUpperCase();
  }
}
