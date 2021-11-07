import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Translate } from "../hook/Translator"
import useWindowSize from "../hook/Window"
import GameContainer from "../container/GameContainer"
import { SOCKET_URL, getData, getSocketData } from "../util/config"
import LoadingBar from "../component/LoadingBar"
import Sidebar from "../component/Sidebar"
import "../css/GamePage.css"
import "../css/common.css"
import { useBeforeunload } from "react-beforeunload";

interface Response {
	status: number,
	request: string,
	message: string,
	data: {}
}

const GamePage = () => {
	const DATA = new Map<String, Response>()

	const { height, width } = useWindowSize()
	const $ = Translate()

	const [loading, setLoading] = useState(true)
	const [opened, setOpened] = useState(false)
	
	const socket = new WebSocket(`${SOCKET_URL}`);
	socket.onopen = () => {
		setOpened(true)
	}
	socket.onmessage = (event) => {
		const data: Response = JSON.parse(event.data);

		if(data.status === 500) {
			alert($("alert.serverError"))
		} else {
			DATA.set(data.request, data)
		}
	};

	useBeforeunload(() => {
		if(socket.readyState === socket.OPEN) {
			socket.send(getSocketData("disconnect"))
			socket.close()
		}
	})

	let connect: NodeJS.Timeout
	useEffect(() => {
		connect = setInterval(() => {
			if (socket.readyState === socket.OPEN) {
				socket.send(getSocketData("connect"));
				socket.send(getSocketData("getUI"))
				clearInterval(connect);

				setLoading(false)
			}
		}, 100);
	}, [])

	useEffect(() => {
		console.log(DATA)
	}, [DATA.get("getUI")])

	return getData("accessToken") ? (
		<GameContainer>
			<div className="center">
				<LoadingBar
					flag={loading}
					size={(height * 0.22 + width * 0.17) / 3}
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
			</div>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	)
}

export default GamePage