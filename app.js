const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("send-location", (data) => {
    console.log("Location from:", socket.id, data);

    io.emit("receive-location", {
      id: socket.id,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
