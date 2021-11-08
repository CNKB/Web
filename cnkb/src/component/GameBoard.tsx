import useWindowSize from "../hook/Window";
import Sidebar from "./Sidebar";

interface Prop {
	component: JSX.Element,
	sidebarComponent: JSX.Element
}

const GameBoard = ({component, sidebarComponent}: Prop) => {
	const { height, width } = useWindowSize();

	return (
		<>
			<Sidebar element={sidebarComponent} />
			<div
				id="FontRegular"
				className="panel"
				style={{
					width: Math.min(width - 75, 600),
					height: height * 0.8,
				}}
			>
				{component}
			</div>
		</>
	);
}

export default GameBoard;