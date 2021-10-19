import { getData, getInstance } from "./../util/config";
import handleToken from "./TokenApi";

export const signIn = (args: any) => {
	return getInstance().post(
		"/user/sign-in",
		{
			email: args.email,
			provider: args.provider
		}
	)
}

export const getPlayers = () => {
	return handleToken(
		getInstance(getData("accessToken")).get("/user/players/t"),
		getPlayers
	);
}