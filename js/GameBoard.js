import { acceptableGuesses } from "./acceptableGuesses.js";
import { Stats } from "./Stats.js";
import { Keyboard } from "./Keyboard.js";

export class GameBoard {
  constructor(answer) {
    this.keyboard = new Keyboard();
    this.stats = new Stats();
    this.tiles = document.querySelectorAll(".game-tile");
    this.rows = document.querySelectorAll(".game-row");
    this.currentGuess = 0;
    this.guess = "";
    this.answers = [];
    this.correctAnswer = answer;
    console.log(this.correctAnswer);
  }

  addLetter(letter) {
    if (this.guess.length < 5) {
      this.guess += letter;
    }
  }

  backspace() {
    this.guess = this.guess.slice(0, this.guess.length - 1);
  }

  refreshBoard(answerArray) {
    answerArray.forEach((letter, index) => {
      this.tiles[index].classList.add("flip-in");
      setTimeout(() => {
        if (letter.isCorrect) {
          this.tiles[index].classList.add("correct");
        } else if (letter.isInWord && !letter.isCorrect) {
          this.tiles[index].classList.add("present");
        } else {
          this.tiles[index].classList.add("absent");
        }
      }, (index % 5) * 250 + 250);
    });
  }

  resetBoard(newAnswer) {
    this.currentGuess = 0;
    this.answers = [];
    this.guess = "";
    this.correctAnswer = newAnswer;
    this.tiles.forEach((tile) => {
      tile.classList.remove("flip-in");
      tile.classList.remove("correct");
      tile.classList.remove("present");
      tile.classList.remove("absent");
      tile.textContent = "";
    });
    this.keyboard.resetKeyboard();
  }

  printGuessLetters(string, bool) {
    const offset = this.currentGuess * 5;
    for (let i = 0; i < 5; i++) {
      this.tiles[i + offset].textContent = string.charAt(i).toUpperCase();
    }
    if (bool) {
      this.tiles[string.length + offset - 1].classList.add("new-letter");
      setTimeout(() => {
        this.tiles[string.length + offset - 1].classList.remove("new-letter");
      }, 100);
    }
  }

  invalidGuess() {
    this.rows[this.currentGuess].classList.add("shake");
    setTimeout(() => {
      this.rows[this.currentGuess].classList.remove("shake");
    }, 600);
  }

  submitGuess(string) {
    if (!acceptableGuesses.includes(string)) {
      this.invalidGuess();
    }
    if (
      this.guess.length === 5 &&
      this.currentGuess <= 6 &&
      acceptableGuesses.includes(string)
    ) {
      this.addGuessToAnswers(string);
      this.currentGuess++;
      this.refreshBoard(this.answers);
      this.keyboard.refreshKeyboard(this.answers);
      if (string === this.correctAnswer) {
        this.gameOverPopup(true);
      }
      this.guess = "";
    }
    if (this.currentGuess === 6) {
      this.gameOverPopup(false);
    }
  }

  addGuessToAnswers(string) {
    for (let i = 0; i < string.length; i++) {
      const nullLetter = {
        letter: string[i],
        isCorrect: string[i] === this.correctAnswer.charAt(i),
        isInWord: this.correctAnswer.includes(string[i]),
      };
      this.answers.push(nullLetter);
    }
  }

  gameOverPopup(bool) {
    const popup = document.querySelector(".game-over");
    const text = document.querySelector(".winning-text");
    if (bool) {
      text.textContent = "You Win!";
      this.stats.addWin(this.currentGuess);
    } else {
      text.textContent = "The answer was '" + this.correctAnswer + "'";
      this.stats.addLoss();
    }
    popup.classList.add("popup");
  }
}
