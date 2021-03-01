import { io } from "socket.io-client"

let socket

export const init = () => {
	socket = io(
		process.env.LOCAL ? "ws://localhost:3000" : "ws://10.32.239.124:3000"
	)
	return socket
}

export const get_socket = () => socket
