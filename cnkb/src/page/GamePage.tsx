import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Translate } from "../hook/Translator"
import useWindowSize from "../hook/Window"
import GameContainer from "../container/GameContainer"
import { SOCKET_URL, getData, getSocketData } from "../util/config"
import LoadingBar from "../component/LoadingBar"
import "../css/GamePage.css"
import "../css/common.css"
import { useBeforeunload } from "react-beforeunload";
import Service from "../api/Service"
import Response from "../api/Response"
import GameBoard from "../component/GameBoard"

const serviceList = new Map<String, Service>()

const GamePage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate()

	const [added, setAdded] = useState<string[]>([]);
	const [Data, setData] = useState(new Map<string, Response>());
	const [loading, setLoading] = useState(true)
	const [component, setComponent] = useState(<></>);
	const [sidebarComponent, setSidebarComponent] = useState(<></>)

	const addData = (key: string, value: Response) => {
		setData((prev) => new Map(prev).set(key, value));
	}

	const removeAdded = (key: string) => {
		const index = added.indexOf(key, 0);
		if (index > -1) {
			added.splice(index, 1);
		}
	}
	
	const socket = new WebSocket(`${SOCKET_URL}`);
	socket.onmessage = (event) => {
		const data: Response = JSON.parse(event.data);

		if(data.status === 500) {
			alert($("alert.serverError"))
		} else {
			let request = data.request

			addData(request, data);
			setAdded([...added, request]);
		}
	};

	useBeforeunload(() => {
		if(socket.readyState === socket.OPEN) {
			socket.send(getSocketData("disconnect"))
			socket.close()
		}
	})

	useEffect(() => {
		let connect = setInterval(() => {
			if (socket.readyState === socket.OPEN) {
				socket.send(getSocketData("connect"));
				socket.send(getSocketData("getUI"))
				clearInterval(connect);

				setLoading(false)
			}
		}, 100);
	}, [])

	useEffect(() => {
		for (let request of added) {
			console.log("Checked - " + request)

			let service = serviceList.get(request);
			let response = Data.get(request)

			if (response) {
				service?.handleData(
					response,
					setLoading,
					setComponent,
					setSidebarComponent,
				);
			}
			
			removeAdded(request)
		}
	}, [added]);

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
							<GameBoard component={component} sidebarComponent={sidebarComponent}/>
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