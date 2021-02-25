import React, { useEffect, useState } from "react"
import { get_socket } from "../socket"

export const FrameViewer = ({ socket }) => {
	const [image_source, set_image_source] = useState("")

	useEffect(() => {
		const socket = get_socket()

		socket.on("get_frame", frame => {
			set_image_source("data:image/jpeg;base64," + frame)
		})
	}, [])

	return <img src={image_source} />
}
