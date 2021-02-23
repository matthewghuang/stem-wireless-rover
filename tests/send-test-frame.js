const io = require("socket.io-client")
const fs = require("fs")

const socket = io("10.32.239.124:3000")

const img = fs.readFileSync("./red-square.jpg", "binary")

socket.on("connect", () => {
	socket.emit("set_frame", "hello")
})
