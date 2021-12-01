import { CSSProperties } from "react";
import { Translate } from "../hook/Translator";

interface Prop {
	innerKey: string,
	style: CSSProperties,
	onClick: () => void
}

const GameSidebarInnerButton = ({innerKey, style: buttonStyle, onClick}: Prop) => {
	const $ = Translate()

	return (
		<button
			id="FontRegular"
			className="commonButton"
			style={{
				...buttonStyle,
				fontSize: "100%",
				marginLeft: "15px"
			}}
			onClick={(event) => {
				event.stopPropagation();
				onClick();
			}}
		>
			{$(innerKey)}
		</button>
	)
}

export default GameSidebarInnerButton