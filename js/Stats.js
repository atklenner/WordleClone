export class Stats {
  constructor() {
    if (!localStorage.getItem("stats")) {
      this.populateStorage();
    }
    this.stats = JSON.parse(localStorage.getItem("stats"));
  }

  populateStorage() {
    localStorage.setItem(
      "stats",
      JSON.stringify({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        losses: 0,
      })
    );
  }

  // almost certainly a cleaner way of doing this
  addWin(number) {
    localStorage.setItem(
      "stats",
      JSON.stringify({ ...this.stats, [number]: this.stats[number] + 1 })
    );
    this.stats = JSON.parse(localStorage.getItem("stats"));
  }

  addLoss() {
    localStorage.setItem(
      "stats",
      JSON.stringify({ ...this.stats, losses: this.stats.losses + 1 })
    );
    this.stats = JSON.parse(localStorage.getItem("stats"));
  }
}
