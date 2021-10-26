import { Redirect } from "react-router-dom"
import GameContainer from "../container/GameContainer";
import "../css/LobbyPage.css"
import "../css/Font.css";
import { useEffect, useState } from "react";
import useWindowSize from "../hook/Window";
import { GAME, getData } from "../util/config";
import { getPlayers } from "../api/UserApi";
import { Translate } from "../hook/Translator";
import LoadingBar from "../component/LoadingBar";
import { createPlayer } from "../api/PlayerApi";

const LobbyPage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate();
	
	const [loading, setLoading] = useState(true)
	const [players, setPlayers] = useState<any[]>([])

	useEffect(() => {
		let accessToken = getData("accessToken");

		if (accessToken) {
			getPlayers().then((result: any) => {
				setPlayers(result.data.data);
				setLoading(false);
			})
		}
	}, [])

	function onEmptyClick() {
		setLoading(true)

		let name = prompt($("prompt.name"))
		if(!name) {
			return
		}

		createPlayer({
			name: name
		}).then(result => {
			GAME.set("playerId", Number(result.data.data))
		}).catch(error => {
			let {status, message} = error

			//TODO
		})

		return (
			<Redirect to="/game"/>
		)
	}

	function onPlayerClick() {
		setLoading(true)
	}

	return getData("accessToken") ? (
		<GameContainer>
			<div className="center">
				<LoadingBar
					flag={loading}
					size={(height * 0.22 + width * 0.17) / 5}
					element={(
						<div>
							{
								players.map((player, index) => {
									return (
										<button
											className="commonButton"
											key={index}
											style={{
												width: width / 2 + 50,
												height: height / 8,
												marginLeft: width / 15,
												marginRight: width / 15,
												marginTop: height / 50,
												marginBottom: height / 50
											}}
										>
											{player.lv ? (
												<span onClick={onPlayerClick}>
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
													onClick={onEmptyClick}
												>
													{$("slot.empty")}
												</span>
											)}
										</button>
									);
								})
							}
						</div>
					)}
				/>
			</div>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	);
}

export default LobbyPage