import "../css/GamePage.css"
import "../css/Font.css";
import React, { CSSProperties, useEffect, useState } from "react";
import { Translate } from "../hook/Translator";
import { getSocketData } from "../util/config";

interface Prop {
	send: (socketData: any) => void;
}

const GameSidebar = ({send}: Prop) => {
	const $ = Translate()
	
	const [UIData, setUIData] = useState(new Map<string, any>())

	const components: any = {
		"game.mine": useState(<>abcd</>)
	};

	const onCategoryClick = (
		event: React.MouseEvent,
		children: any,
	) => {
		event.stopPropagation();

		Object.keys(children).forEach((key) => {
			const { type } = children[key];
			console.log(type);
		});
		console.log(children);
	};

	const UI: any = {
		"game.mine": {
			"game.mine.mineLv": {
				type: "upDownButton",
				min: 1,
				max: 9,
				default: 1
			},
			"game.mine.mine": {
				type: "button",
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
		fontSize: "115%",
		marginTop: "5px",
	};

	return (
		<>
			{
				<div>
					{Object.keys(UI).map((keyValue, index) => {
						return (
							<div key={index}>
								<button
									key={keyValue}
									className="commonButton"
									id="FontRegular"
									style={buttonStyle}
									onClick={(event) => {
										onCategoryClick(event, UI[keyValue]);
									}}
								>
									{$(keyValue)}
								</button>
							</div>
						);
					})}
				</div>
			}
		</>
	)
}

export default GameSidebar