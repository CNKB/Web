import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Translate } from "../hook/Translator"
import useWindowSize from "../hook/Window"
import GameContainer from "../container/GameContainer"
import { getData, setData } from "../util/config"
import LoadingBar from "../component/LoadingBar"
import Sidebar from "../component/Sidebar"
import "../css/GamePage.css"

const GamePage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
	}, [])

	return getData("accessToken") ? (
		<GameContainer>
			<LoadingBar
				flag={loading}
				size={(height * 0.22 + width * 0.17)}
				element={(
					<div style={{
						marginTop: "20px",
						width: width * 0.985,
						height: height * 0.803
					}}>
						<Sidebar
							element={
								<>
									<div>a</div>
									<div>b</div>
									<div>c</div>
								</>
							}
						/>
						<div id="FontRegular" className="panel"
							style={{
								width: Math.min(width - 75, 1000),
								height: height * 0.8
							}}
						>
							abcd
						</div>						
					</div>
				)}
			/>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	)
}

export default GamePage