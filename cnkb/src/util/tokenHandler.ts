import { getData, getInstance, removeData, setData } from "./config";
import { AxiosInstance, AxiosResponse } from "axios"
import render from "..";

interface Prop {
	instance: AxiosInstance,
	method: string,
	path: string,
	body?: {},
	then?: (result: AxiosResponse<unknown, any>) => void,
	onError?: (error: any) => void,
	refreshed?: boolean
}

const refreshToken = (error: any, args: Prop): boolean => {
	let { status } = error;

	if(status === 401) {
		console.log(args.refreshed)

		if(args.refreshed) {
			return false
		}

		args.refreshed = true

		getInstance(undefined, {
			"refreshToken": getData("refreshToken")
		}).get(
			"/user/token"
		).then((result: any) => {
			const data = result.data.data
			
			setData("accessToken", data.accessToken)
			setData("refreshToken", data.refreshToken)

			args.instance = getInstance(data.accessToken)

			handleToken(args)
		}).catch(() => {
			removeData("accessToken")
			removeData("refreshToken")

			alert("세션이 만료되었습니다.\n다시 로그인해주세요")
			render()
		})
		
		return false
	}

	return true
}

const handleToken = (args: Prop) => {
	const {instance, method, path} = args;
	
	const body = args.body = args.body || {}
	const then = args.then = args.then || (() => {})
	const onError = args.onError = args.onError || (() => {})

	args.refreshed = args.refreshed || false

	switch(args.method) {
	case "get":
		instance.get(path)
			.then(result => then(result))
			.catch(error => {
				let errorData = error.response.data

				if(refreshToken(errorData, args)) {
					onError(errorData)
				}
			})

		break

	case "post":
		instance.post(path, body)
			.then(result => then(result))
			.catch(error => {
				let errorData = error.response.data

				if(refreshToken(errorData, args)) {
					onError(errorData)
				}
			})

		break
	}
}

export default handleToken