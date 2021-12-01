import { CSSProperties, useEffect } from "react";
import { UI_TYPE } from "../util/config";
import GameSidebarCategoryButton from "./GameSidebarCategoryButton";
import GameSidebarInnerButton from "./GameSidebarInnerButton";
import GameSidebarInnerUpDownButton from "./GameSidebarInnerUpDownButton";

interface Prop {
	keyValue: string,
	style: CSSProperties,
	categoryButtonFlag: boolean,
	UI: any,
	UIData: Map<string, any>,
	onCategoryClick: (keyValue: string) => void,
	setUIData: (innerKey: string, value: any) => void
}

const GameSidebarCategory = (
	{
		keyValue, style, categoryButtonFlag, UI,
		UIData, onCategoryClick, setUIData
	}: Prop) => {
		
	useEffect(() => {
		Object.keys(UI).forEach((keyValue) => {
			Object.keys(UI[keyValue]).forEach((innerKey) => {
				const data = UI[keyValue][innerKey];

				if (data.type === UI_TYPE.upDownButton)  {
					setUIData(innerKey, data.default)
				}
			})
		})

		// eslint-disable-next-line
	}, [])

	return (
		<>
			<GameSidebarCategoryButton
				keyValue={keyValue}
				buttonStyle={style}
				onCategoryClick={onCategoryClick}
			/>
			{categoryButtonFlag ? (
				<div>
					{
						Object.keys(UI[keyValue]).map((innerKey, innerIndex) => {
							let output;
							const data = UI[keyValue][innerKey];

							if (data.type === UI_TYPE.button) {
								output = (
									<GameSidebarInnerButton
										key={innerIndex}
										innerKey={innerKey}
										style={style}
										onClick={data.onClick}
									/>
								);
							} else if (data.type === UI_TYPE.upDownButton) {
								output = (
									<div
										key={innerIndex}
										style={{
											...style,
											display: "inline-block",
											fontSize: "102%",
											marginLeft: "15px",
											padding: "2px"
										}}
									>
										<GameSidebarInnerUpDownButton
											innerKey={innerKey}
											UIData={UIData}
											setUIData={setUIData}
											min={data.min}
											max={data.max}
										/>
									</div>
								);
							}

							return output
						})
					}
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default GameSidebarCategory