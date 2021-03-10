import { Server, Socket } from "socket.io"

const PORT = 3000

const io = new Server(PORT, {
	cors: {
		origin: "*"
	}
})

io.on("connection", (socket: Socket) => {
	console.log("a user connected")

	// clients will send a direction instruction, the ESP8266 will wait for
	// this instruction and act accordingly
	socket.on("set_direction", (direction: string) => {
		socket.broadcast.emit("get_direction", direction)
	})
})

console.log(`listening on port ${PORT}`)
