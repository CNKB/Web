import { Redirect, useHistory } from "react-router-dom"
import GameContainer from "../container/GameContainer";
import "../css/LobbyPage.css"
import "../css/Font.css";
import { useEffect, useState } from "react";
import useWindowSize from "../hook/Window";
import { getData, getInstance, setData } from "../util/config";
import { Translate } from "../hook/Translator";
import LoadingBar from "../component/LoadingBar";
import handleToken from "../util/tokenHandler";

const LobbyPage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate();
	
	const [loading, setLoading] = useState(true)
	const [players, setPlayers] = useState<any[]>([])

	const history = useHistory()

	useEffect(() => {
		let accessToken = getData("accessToken");

		if (accessToken) {
			handleToken({
				instance: getInstance(getData("accessToken")),
				method: "get",
				path: "/user/players/t",
				then: (result: any) => {
					setPlayers(result.data.data)
				}
			})

			setLoading(false)
		}
	}, [])

	function onEmptyClick() {
		let name = prompt($("prompt.nickname"))
		if(!name) {
			return
		}
		
		setLoading(true)

		handleToken({
			instance: getInstance(getData("accessToken")),
			method: "post",
			path: "/player/create-player/t",
			body: {
				name: name
			},
			then: (result: any) => {
				setData("playerId", String(result.data.data));
			},
			onError: (error => {
				let {status, message} = error

				if(status === 406) {
					if(message.startsWith("Invalid length")) {
						alert($("error.nickname.length", message.substr(17).split(",")))
					} else if(message.startsWith("Invalid regex")) {
						alert($("error.nickname.regex", [message.substr(16)]))
					} else if(message.startsWith("Invalid word")) {
						alert($("error.nickname.word", [message.substr(15)]))
					}
				}

				setLoading(false)
				return;
			})
		})

		history.push("/game")
	}

	function onPlayerClick(id: number) {
		setData("playerId", String(id))
		history.push("/game")
	}

	return getData("accessToken") ? (
		<GameContainer>
			<div className="center">
				<LoadingBar
					flag={loading}
					size={(height * 0.22 + width * 0.17) / 5}
					element={(
						<>
							{
								players.map((player, index) => {
									return (
										<button className="commonButton"
											key={index}
											style={{
												width: width / 2 + 50,
												height: height / 8,
												marginLeft: width / 15,
												marginRight: width / 15,
												marginTop: height / 50,
												marginBottom: height / 50
											}}
											onClick={player.id ? () => onPlayerClick(player.id) : onEmptyClick}
										>
											{player.id ? (
												<span>
													<span id="FontRegular"
														style={{
															fontSize: width / 80 + height / 100,
															width: "100%",
															height: "75%"
														}}
													>
														[{player.title}] {player.name} (Lv. {player.lv})
													</span>
													<span id="FontRegular"
														style={{
															fontSize: width / 150 + height / 220,
															display: "block",
															height: "25%",
															color: "#b5b5b5"
														}}
													>
														{$("last_played")}: {player.lastPlayed}
													</span>
												</span>
											) : (
												<span id="FontRegular"
													style={{
														fontSize: width / 50 + height / 75
													}}
												>
													{$("slot.empty")}
												</span>
											)}
										</button>
									);
								})
							}
						</>
					)}
				/>
			</div>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	);
}

export default LobbyPage