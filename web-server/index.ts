import { Server, Socket } from "socket.io"

const PORT = 3000

const io = new Server(PORT)

io.on("connection", (socket: Socket) => {
	console.log("a user connected")

	// raspberry pi will send the image to the socket.io server and the frame
	// will be sent to all other connected clients
	socket.on("set_frame", (frame: any) => {
		// send it out to all other clients
		socket.broadcast.emit("get_frame", frame)
	})

	// clients will send a direction instruction, the ESP8266 will wait for
	// this instruction and act accordingly
	socket.on("set_input", (dir: number, forward: boolean,
			reverse: boolean) => {
		socket.broadcast.emit("get_input", dir, forward, reverse)
	})
})

console.log(`listening on port ${PORT}`)
