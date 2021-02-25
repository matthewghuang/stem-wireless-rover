import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { FrameViewer } from "./components/FrameViewer"
import { init, get_socket } from "./socket"

export const App = () => {
	const [loading, set_loading] = useState(true)

	useEffect(() => {
		const socket = init()

		socket.on("connect", () => {
			set_loading(false)
		})
	}, [])

	return loading ? (
		<div className="text-lg">Connecting...</div>
	) : (
		<div>
			<FrameViewer></FrameViewer>
		</div>
	)
}
