import React, { useEffect, useState } from "react"
import "../css/Font.css"
import useWindowSize from "../hook/Window"
import "../css/Sidebar.css"

interface Prop {
	element: JSX.Element
}

const Sidebar = ({element}: Prop) => {
	const { height, width } = useWindowSize()

	const [leftSidePos, setLeftSidePos] = useState(Math.max(200, width * 0.11) * -1 + 15);
	const [background, setBackground] = useState("grey")
	const [enable, setEnable] = useState(true)
	const [sidebarSize, setSidebarSize] = useState(0)

	useEffect(() => {
		let max = Math.max(200, width * 0.11)
		setSidebarSize(max)
	}, [width, height])

	function toggle() {
		if(!enable) {
			return
		}

		setEnable(false)

		if(leftSidePos < 0) {
			setLeftSidePos(0)
			setBackground("black")
		} else {
			setLeftSidePos(sidebarSize * -1 + 15)
			setBackground("grey")
		}

		setTimeout(() => {
			setEnable(true)
		}, 500)
	}

	return (
		<div id="FontRegular" className="sidebar"
			onClick={toggle}
			style={{
				transform: `translateX(${leftSidePos}px)`,
				backgroundColor: background,
				width: sidebarSize
			}}
		>
			<React.Fragment>{element}</React.Fragment>
		</div>
	)
}

export default Sidebar