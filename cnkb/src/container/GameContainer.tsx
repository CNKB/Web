import { useEffect, useState } from "react";
import useWindowSize from "../hook/Window";
import DefaultContainer from "./DefaultContainer";
import "../css/Font.css";

const GameContainer = ({children}: any) => {
	const { height, width } = useWindowSize();
	const [logoSize, setLogoSize] = useState(0);

	useEffect(() => {
		setLogoSize(height * 0.11 + width * 0.08);
	}, [height, width])

	const style: React.CSSProperties = {
		fontSize: logoSize / 4,
		textAlign: "center"
	}

	return (
		<DefaultContainer>
			<div id="FontBold" style={style}>
				CNKB
			</div>
			{children}
		</DefaultContainer>
	)
}

export default GameContainer