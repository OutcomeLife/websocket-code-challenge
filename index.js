const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.send("connected");

  ws.on("message", (message) => {
    let reversed = "";

    message
      .toString()
      .split("")
      .forEach((char) => {
        reversed = `${char}${reversed}`;
      });

    ws.send(reversed);
  });
});

console.log("listening on port: 8080");
