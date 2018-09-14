const http = require("http");

class App {
  constructor(intervalInMilliseconds) {
    this._intervalInMilliseconds = intervalInMilliseconds;
  }

  wakeUp() {
    console.log("Waking up http://localhost:3000");

    http
      .get("http://localhost:3000", response => {
        console.log(response.statusCode);
      })
      .on("error", error => {
        console.log("Error: " + error.message);
      });
  }

  start() {
    this.wakeUp();

    console.log(
      `Scheduling wake up every ${this._intervalInMilliseconds} milliseconds`
    );

    setInterval(() => {
      this.wakeUp();
    }, this._intervalInMilliseconds);
  }
}

module.exports = App;
