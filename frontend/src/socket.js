import { io } from "socket.io-client"

let socket

export const init = () => {
	socket = io("ws://localhost:3000")
	return socket
}

export const get_socket = () => socket
