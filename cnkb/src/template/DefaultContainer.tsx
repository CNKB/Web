import useWindowSize from "../hook/Window";

interface Props {
	children?: any
}

const Container = ({children}: Props) => {
	const { height, width } = useWindowSize();

	const style: React.CSSProperties = {
		position: "absolute",
		textAlign: "center",
		color: "#999999",
		bottom: "2px",
		left: "50%",
		transform: "translate(-50%, 0)",
		whiteSpace: "nowrap",
		fontSize: height * 0.012 + width * 0.008
	};

	return (
		<>
			{children}
			<div id="FontRegular"
				style={style}>
				Game 'CNKB'<br />
				Copyright(C) 2021. namsic. All rights reserved
			</div>
		</>
	);
}

export default Container;