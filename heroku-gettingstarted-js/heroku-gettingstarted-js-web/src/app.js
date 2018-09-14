const http = require("http");

class App {
  constructor(hostname, port) {
    this._server = http.createServer((request, response) => {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end("Hello World !");
    });

    this._server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
}

module.exports = App;
