import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Box = styled.button.attrs({
	className: "flex justify-center items-center text-4xl"
})``

export const DirectionController = () => {
	const [direction, set_direction] = useState("")

	useEffect(() => {
		console.log(direction)
	}, [direction])

	return (
		<div className="grid grid-cols-3">
			<div></div>
			<DirectionButton direction="up" set={set_direction}>
				↑
			</DirectionButton>
			<div></div>
			<DirectionButton direction="left" set={set_direction}>
				←
			</DirectionButton>
			<div></div>
			<DirectionButton direction="right" set={set_direction}>
				→
			</DirectionButton>
			<div></div>
			<DirectionButton direction="down" set={set_direction}>
				↓
			</DirectionButton>
			<div></div>
		</div>
	)
}

const DirectionButton = props => {
	const { direction, set } = props

	const on_down = () => {
		set(direction)
	}

	const on_up = () => {
		set("")
	}

	return (
		<Box
			onMouseDown={on_down}
			onMouseUp={on_up}
			onTouchStart={on_down}
			onTouchEnd={on_up}
		>
			{props.children}
		</Box>
	)
}
