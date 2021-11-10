import { Translate } from "../hook/Translator";

interface Prop {
	innerKey: string,
	value: any,
	min: number,
	max: number
}

const GameSidebarInnerUpDownButton = ({innerKey, value, min, max}: Prop) => {
	const $ = Translate()
	
	//TODO

	return (
		<>
			<div
				style={{
					fontSize: "100%",
				}}
			>
				{`${$(innerKey)}: ${value}`}
			</div>
		</>
	);
}

export default GameSidebarInnerUpDownButton