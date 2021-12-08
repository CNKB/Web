import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Translate } from "../hook/Translator"
import useWindowSize from "../hook/Window"
import GameContainer from "../container/GameContainer"
import { SOCKET_URL, getData, getSocketData, getInstance, removeData, setData } from "../util/config"
import LoadingBar from "../component/LoadingBar"
import "../css/GamePage.css"
import "../css/Common.css"
import { useBeforeunload } from "react-beforeunload";
import Service from "../api/Service"
import Response from "../api/Response"
import GameBoard from "../component/GameBoard"
import render from ".."
import GameSidebar from "../component/GameSidebar"
import ConnectService from "../api/ConnectService"
import MineService from "../api/MineService"

const serviceList = new Map<String, Service>()
serviceList.set("connect", new ConnectService())
serviceList.set("mine", new MineService())

const socket = new WebSocket(`${SOCKET_URL}`)

const GamePage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate()

	const sent = new Map<string, string>()

	const [added, setAdded] = useState<string[]>([]);
	const [GameData, setGameData] = useState(new Map<string, Response>());
	const [loading, setLoading] = useState(true)
	const [component, setComponent] = useState(<></>);

	const board = document.getElementById("board")?.children.item(1)

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
		if(socket.readyState === socket.OPEN) {
			let stringified = JSON.stringify(socketData);
			sent.set(socketData.request, stringified);
			socket.send(stringified);
		}
	};

	const addMessage = (message: string) => {
		setComponent(
			<>
				{component}
				<div style={{ margin: "5px" }}>{message}</div>
			</>
		)
	}

	useEffect(() => {
		socket.onmessage = (event) => {
			console.log(event.data)
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
			} else if (data.status === 412) {
				alert(`클라이언트 오류가 발생했습니다\n관리자에게 문의해주세요\n에러 코드: ${data.status}`)
			} else {
				let request = data.request;

				addData(request, data);
				setAdded([...added, request]);
			}
		};

		socket.onclose = (event) => {
			console.log(`${event.code} - ${event.reason}`)
		}

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

			if(!service) {
				console.log(`Service is null - ${request}`)
				return;
			}

			if (response) {
				service.handleData({
					response,
					$,
					addMessage,
				});
			}

			removeAdded(request);
		}

		// eslint-disable-next-line
	}, [added]);

	useEffect(() => {
		if (board) {
			board.scrollTop = board.scrollHeight
		}

		// eslint-disable-next-line
	}, [component])

	return getData("accessToken") ? (
		<GameContainer>
			<div className="center">
				<LoadingBar
					flag={loading}
					size={(height * 0.22 + width * 0.17) / 3}
					element={
						<div
							id="board"
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