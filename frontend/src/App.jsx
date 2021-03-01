import React, { useState, useEffect } from "react"
import { FrameViewer } from "./components/FrameViewer"
import { DirectionController } from "./components/DirectionController"
import { init } from "./socket"

export const App = () => {
	const [loading, set_loading] = useState(true)
	const [ready, set_ready] = useState(false)

	useEffect(() => {
		const socket = init()

		socket.on("connect", () => {
			set_loading(false)

			socket.on("get_frame", () => set_ready(true))
		})
	}, [])

	return loading ? (
		<div className="text-lg">Connecting...</div>
	) : ready ? (
		<div className="md:w-3/5 mx-auto">
			<FrameViewer></FrameViewer>
			<DirectionController></DirectionController>
		</div>
	) : (
		<div>Waiting for camera...</div>
	)
}
