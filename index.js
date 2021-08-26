const express = require("express");
const { Server } = require("ws");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express();

server
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

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
