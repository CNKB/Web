import { getData, getInstance, removeData, setData } from "../util/config";
import render from "..";

const handleToken = (result: Promise<any>, self: () => Promise<any>) => {
	result.catch((error) => {
		if (error.response.status == 401) {
			getInstance(undefined, {
				"refreshToken": getData("refreshToken")
			}).get(
				"/user/token"
			).then((tokenResult: any) => {
				const data = tokenResult.data.data;
				setData("accessToken", data.accessToken)
				setData("refreshToken", data.refreshToken)

				window.location.reload()
			}).catch(() => {
				removeData("accessToken")
				removeData("refreshToken")

				render()
			})
		}
	});

	return result;
};

export default handleToken