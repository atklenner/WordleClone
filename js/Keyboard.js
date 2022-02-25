export class Keyboard {
  constructor() {
    this.buttons = document.querySelectorAll("[data-letter]");
  }

  refreshKeyboard(answerArray) {
    this.buttons.forEach((button) => {
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

  resetKeyboard() {
    this.buttons.forEach((button) => {
      button.classList.remove("correct");
      button.classList.remove("present");
      button.classList.remove("absent");
    });
  }
}
