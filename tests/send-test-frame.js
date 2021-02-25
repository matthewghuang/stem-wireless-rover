const io = require("socket.io-client")
const fs = require("fs")

const socket = io("ws://localhost:3000")

setInterval(() => {
	const img = fs.readFileSync("./test.jpg", "base64")
	socket.emit("set_frame", img)
}, 1000)
