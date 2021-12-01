import { CSSProperties, useState } from "react";
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
	const disabled = min === max;
	
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
				setUIData(innerKey, min)
				return
			}
		} else {
			if (value === min) {
				setValue(max)
				setUIData(innerKey, max)
				return
			}
		}

		setValue(increase ? value + 1 : value - 1)
		setUIData(innerKey, value)
	}

	return (
		<>
			<button
				style={innerStyle}
				disabled={disabled}
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
				disabled={disabled}
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