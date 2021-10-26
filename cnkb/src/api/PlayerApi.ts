import { getData, getInstance } from "./../util/config";
import handleToken from "./TokenApi"

export const createPlayer = (args: any) => {
	return handleToken(
		getInstance(getData("accessToken"))
			.post(
				"/player/create-player",
				args
			)
	)
}