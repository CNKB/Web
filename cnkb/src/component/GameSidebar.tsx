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
						mineLv: UIData.get("game.mine.mineLv")
					}))
				}
			}
		}
	}

	const style: CSSProperties = {
		color: "white",
		backgroundColor: "#111111",
		border: "2px solid grey",
		marginTop: "5px"
	};

	const setUIDataReact = (innerKey: string, value: any) => {
		setMap(innerKey, value, setUIData)
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
									style={style}
									categoryButtonFlag={componentFlag.get(keyValue) as boolean}
									UI={UI}
									UIData={UIData}
									onCategoryClick={onCategoryClick}
									setUIData={setUIDataReact}
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