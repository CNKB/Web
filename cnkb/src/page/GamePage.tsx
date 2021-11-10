import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Translate } from "../hook/Translator"
import useWindowSize from "../hook/Window"
import GameContainer from "../container/GameContainer"
import { SOCKET_URL, getData, getSocketData, getInstance, removeData, setData } from "../util/config"
import LoadingBar from "../component/LoadingBar"
import "../css/GamePage.css"
import "../css/common.css"
import { useBeforeunload } from "react-beforeunload";
import Service from "../api/Service"
import Response from "../api/Response"
import GameBoard from "../component/GameBoard"
import render from ".."
import GameSidebar from "../component/GameSidebar"

const serviceList = new Map<String, Service>()
const socket = new WebSocket(`${SOCKET_URL}`);

const GamePage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate()

	const sent = new Map<string, string>()

	const [added, setAdded] = useState<string[]>([]);
	const [GameData, setGameData] = useState(new Map<string, Response>());
	const [loading, setLoading] = useState(true)
	const [component, setComponent] = useState(<></>);

	const addData = (key: string, value: Response) => {
		setGameData((prev) => new Map(prev).set(key, value));
	}

	const removeAdded = (key: string) => {
		const index = added.indexOf(key, 0);
		if (index > -1) {
			added.splice(index, 1);
		}
	}

	const send = (socketData: any) => {
		let stringified = JSON.stringify(socketData);
		sent.set(socketData.request, stringified);
		socket.send(stringified);
	};

	useEffect(() => {
		socket.onmessage = (event) => {
			const data: Response = JSON.parse(event.data);

			if (data.status === 500) {
				alert($("alert.serverError"));
			} else if (data.status === 401) {
				getInstance(undefined, {
					refreshToken: getData("refreshToken"),
				})
					.get("/user/token")
					.then((result: any) => {
						const data = result.data.data;

						setData("accessToken", data.accessToken);
						setData("refreshToken", data.refreshToken);

						send(sent.get(data.request));
					})
					.catch((e) => {
						console.error(e)

						removeData("accessToken");
						removeData("refreshToken");

						alert("세션이 만료되었습니다.\n다시 로그인해주세요");
						render();
					});
			} else {
				let request = data.request;

				addData(request, data);
				setAdded([...added, request]);
			}
		};

		let connect = setInterval(() => {
			if (socket.readyState === socket.OPEN) {
				send(getSocketData("connect"));
				clearInterval(connect);

				setLoading(false);
			}
		}, 100);

		// eslint-disable-next-line
	}, [])

	useBeforeunload(() => {
		if (socket.readyState === socket.OPEN) {
			send(getSocketData("disconnect"));
			socket.close();
		}
	});

	useEffect(() => {
		for (let request of added) {
			let service = serviceList.get(request);
			let response = GameData.get(request);

			if (response) {
				service?.handleData(
					response,
					$,
					setLoading,
					setComponent,
				);
			}

			removeAdded(request);
		}

		// eslint-disable-next-line
	}, [added]);

	return getData("accessToken") ? (
		<GameContainer>
			<div className="center">
				<LoadingBar
					flag={loading}
					size={(height * 0.22 + width * 0.17) / 3}
					element={
						<div
							style={{
								marginTop: "20px",
								width: width * 0.985,
								height: height * 0.803,
							}}
						>
							<GameBoard
								component={component}
								sidebarComponent={<GameSidebar send={send} />}
							/>
						</div>
					}
				/>
			</div>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	);
}

export default GamePage