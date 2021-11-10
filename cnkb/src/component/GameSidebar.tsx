import "../css/GamePage.css"
import "../css/Font.css";
import React, { CSSProperties, useState } from "react";
import { getSocketData, UI_TYPE } from "../util/config";
import GameSidebarCategory from "./GameSidebarCategory";

interface Prop {
	send: (socketData: any) => void;
}

const GameSidebar = ({ send }: Prop) => {
	const [UIData, setUIData] = useState(new Map<string, any>())
	const [componentFlag, setComponentFlag] = useState(new Map<string, boolean>([
		["game.mine", false]
	]))

	const setMap = (key: string, value: any, setter: React.Dispatch<React.SetStateAction<Map<string, any>>>) => {
		setter((prev) => {
			if(prev.get(key) === value) {
				return prev
			}

			const map = new Map(prev).set(key, value)
			console.log("GetData: " + UIData.get(key) + ", Map: " + JSON.stringify(Array.from(map.entries())))
			return map
		})
	}

	const onCategoryClick = (keyValue: string) => {
		setMap(keyValue, !componentFlag.get(keyValue), setComponentFlag)
	};

	const UI: any = {
		"game.mine": {
			"game.mine.mineLv": {
				type: UI_TYPE.upDownButton,
				min: 1,
				max: 9,
				default: 1
			},
			"game.mine.mine": {
				type: UI_TYPE.button,
				onClick: () => {
					send(getSocketData("mine", {
						mineLv: UIData.get("mineLv")
					}))
				}
			}
		}
	}

	const buttonStyle: CSSProperties = {
		color: "white",
		backgroundColor: "#111111",
		border: "2px solid grey",
		marginTop: "5px",
	};

	const setUICategoryData = (innerKey: string, defaultValue: any) => {
		setMap(innerKey, defaultValue, setUIData)
	}

	return (
		<>
			{
				<div>
					{Object.keys(UI).map((keyValue, index) => {
						return (
							<div key={index}>
								<GameSidebarCategory
									keyValue={keyValue}
									buttonStyle={buttonStyle}
									categoryButtonFlag={componentFlag.get(keyValue) as boolean}
									UI={UI}
									UIData={UIData}
									onCategoryClick={onCategoryClick}
									setUICategoryData={setUICategoryData}
								/>
							</div>
						);
					})}
				</div>
			}
		</>
	)
}

export default GameSidebar