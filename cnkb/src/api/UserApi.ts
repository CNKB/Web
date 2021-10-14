import { instance } from "../util/config"

export const signIn = (email: string, provider: string) => {
	return instance.post(
		"/user/sign-in",
		{
			email: email,
			provider: provider
		}
	)
}