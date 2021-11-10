import { CSSProperties } from "react";
import { Translate } from "../hook/Translator";

interface Prop {
	keyValue: string,
	buttonStyle: CSSProperties,
	onCategoryClick: (keyValue: string) => void
}

const GameSidebarCategoryButton = ({keyValue, buttonStyle, onCategoryClick}: Prop) => {
	const $ = Translate()

	return (
		<button
			key={keyValue}
			id="FontRegular"
			className="commonButton"
			style={{
				...buttonStyle,
				fontSize: "115%",
			}}
			onClick={(event) => {
				event.stopPropagation();
				onCategoryClick(keyValue);
			}}
		>
			{$(keyValue)}
		</button>
	)
}

export default GameSidebarCategoryButton