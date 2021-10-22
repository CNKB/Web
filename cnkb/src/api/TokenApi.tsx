import { getData, getInstance, removeData, setData } from "../util/config";
import render from "..";

const handleToken = (result: Promise<any>) => {
	result.catch((error) => {
		if (error.response.status === 401) {
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

				alert("세션이 만료되었습니다.\n다시 로그인해주세요")
				render()
			})
		}
	});

	return result;
};

export default handleToken