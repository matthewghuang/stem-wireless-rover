const io = require("socket.io-client")
const fs = require("fs")

const socket = io(
	process.env.LOCAL ? "ws://localhost:3000" : "ws://10.32.239.124:3000"
)

setInterval(() => {
	const img = fs.readFileSync("./test.jpg", "base64")
	socket.emit("set_frame", img)
}, 1000)
