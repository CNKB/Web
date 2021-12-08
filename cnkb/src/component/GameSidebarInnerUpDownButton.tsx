import { CSSProperties, useEffect, useState } from "react";
import { Translate } from "../hook/Translator";

interface Prop {
	innerKey: string,
	UIData: Map<string, any>,
	min: number,
	max: number,
	setUIData: (innerKey: string, value: any) => void
}

const GameSidebarInnerUpDownButton = ({innerKey, UIData, min, max, setUIData}: Prop) => {
	const $ = Translate()
	const [value, setValue] = useState(UIData.get(innerKey))
	
	const innerStyle: CSSProperties = {
		background: "#222222",
		color: "white",
		paddingLeft: "3px",
		paddingRight: "3px",
		fontSize: "105%"
	}

	const onClick = (increase: boolean) => {
		if(increase) {
			if (value === max) {
				setValue(min)
				return
			}
		} else {
			if (value === min) {
				setValue(max)
				return
			}
		}

		setValue(increase ? value + 1 : value - 1)
	}

	useEffect(() => {
		setUIData(innerKey, value)
		// eslint-disable-next-line
	}, [value])

	return (
		<>
			<button
				style={innerStyle}
				onClick={(event) => {
					event.stopPropagation()
					onClick(false);
				}}
			>
				{"\u25BC"}
			</button>
			{` ${$(innerKey)}: ${value} `}
			<button
				style={innerStyle}
				onClick={(event) => {
					event.stopPropagation()
					onClick(true)
				}}
			>
				{"\u25B2"}
			</button>
		</>
	);
}

export default GameSidebarInnerUpDownButton