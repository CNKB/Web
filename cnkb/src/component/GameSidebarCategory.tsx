import { CSSProperties, useEffect } from "react";
import { UI_TYPE } from "../util/config";
import GameSidebarCategoryButton from "./GameSidebarCategoryButton";
import GameSidebarInnerButton from "./GameSidebarInnerButton";
import GameSidebarInnerUpDownButton from "./GameSidebarInnerUpDownButton";

interface Prop {
	keyValue: string,
	buttonStyle: CSSProperties,
	categoryButtonFlag: boolean,
	UI: any,
	UIData: Map<string, any>,
	onCategoryClick: (keyValue: string) => void,
	setUICategoryData: (innerKey: string, defaultValue: any) => void
}

const GameSidebarCategory = (
	{
		keyValue, buttonStyle, categoryButtonFlag, UI,
		UIData, onCategoryClick, setUICategoryData
	}: Prop) => {
		
	useEffect(() => {
		Object.keys(UI).forEach((keyValue) => {
			Object.keys(UI[keyValue]).forEach((innerKey) => {
				const data = UI[keyValue][innerKey];

				if (data.type === UI_TYPE.upDownButton)  {
					setUICategoryData(innerKey, data.default)
				}
			})
		})

		// eslint-disable-next-line
	}, [])

	return (
		<>
			<GameSidebarCategoryButton
				keyValue={keyValue}
				buttonStyle={buttonStyle}
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
										buttonStyle={buttonStyle}
										onClick={data.onClick}
									/>
								);
							} else if (data.type === UI_TYPE.upDownButton) {
								output = (
									<div key={innerIndex}>
										<GameSidebarInnerUpDownButton
											innerKey={innerKey}
											value={UIData.get(innerKey)}
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