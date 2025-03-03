const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

app.get("/api/hello", (req, res) => {
    res.send("hello");
})

io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);

    socket.on("message", (mssg) => {
        console.log(mssg);
        io.emit("receive-message", mssg);
    })

    socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

server.listen(8080, () => {
    console.log("App started listening on port 8080");

})