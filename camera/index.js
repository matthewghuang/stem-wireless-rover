const node_webcam = require("node-webcam")
const io = require("socket.io-client")

const socket = io("ws://localhost:3000")

const opts = {
	saveShots: true,
	output: "jpeg",
	device: false,
	callbackReturn: "base64",
	verbose: false
}

const webcam = node_webcam.create(opts)

socket.on("connect", () => {
	console.log("connected")

	setInterval(() => {
		webcam.capture("frame", (err, data) => {
			if (err) {
				console.error(err)
				return
			}

			socket.emit("set_frame", data)
		})
	}, 1000 / 30)
})
