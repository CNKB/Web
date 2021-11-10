import { CSSProperties } from "react";
import { Translate } from "../hook/Translator";

interface Prop {
	innerKey: string,
	buttonStyle: CSSProperties,
	onClick: () => void
}

const GameSidebarInnerButton = ({innerKey, buttonStyle, onClick}: Prop) => {
	const $ = Translate()

	return (
		<button
			id="FontRegular"
			className="commonButton"
			style={{
				...buttonStyle,
				fontSize:
					"100%",
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