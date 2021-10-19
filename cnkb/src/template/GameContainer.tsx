import { useEffect, useState } from "react";
import useWindowSize from "../hook/Window";
import DefaultContainer from "./DefaultContainer";
import Logo from "../image/logo.png";
import "../css/Font.css";

export default ({children}: any) => {
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