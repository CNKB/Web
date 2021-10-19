import { Redirect } from "react-router-dom"
import GameContainer from "../template/GameContainer";
import "../css/LobbyPage.css"
import "../css/Font.css";
import { useEffect, useState } from "react";
import useWindowSize from "../hook/Window";
import { CommonLoader, getData } from "../util/config";
import { getPlayers } from "../api/UserApi";
import { Translate } from "../hook/Translator";

const LobbyPage = () => {
	const { height, width } = useWindowSize()
	const $ = Translate();
	
	const [loading, setLoading] = useState(true)
	const [players, setPlayers] = useState<any[]>([])

	useEffect(() => {
		let accessToken = getData("accessToken");

		if (accessToken) {
			getPlayers().then((result: any) => {
				result.data.data[0] = {
					lv: 35,
					name: "남식",
					title: "관리자",
					lastPlayed: "2021.09.23",
				};
				setPlayers(result.data.data);
			});
		}

		setLoading(false)
	}, [])

	return getData("accessToken") ? (
		<GameContainer>
			<CommonLoader>
				{{
					flag: loading,
					size: (height * 0.22 + width * 0.17) / 5,
					element: (
						<div>
							<div className="center">
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
													marginBottom: height / 50,
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												{player.lv ? (
													<span>
														<span id="FontRegular" style={{
															fontSize: width / 80 + height / 100,
															width: "100%",
															height: "75%"
														}}>
															[{player.title}] {player.name} (Lv. {player.lv})
														</span>
														<span id="FontRegular" style={{
															fontSize: width / 150 + height / 220,
															display: "block",
															height: "25%"
														}}>
															{$("last_played")}: {player.lastPlayed}
														</span>
													</span>
												) : (
													<span id="FontRegular" style={{
														fontSize: width / 50 + height / 75
													}}>
														{$("slot.empty")}
													</span>
												)}
											</button>
										);
									})
								}
							</div>
						</div>
					),
				}}
			</CommonLoader>
		</GameContainer>
	) : (
		<Redirect to="/sign-in" />
	);
}

export default LobbyPage