import axios from 'axios'
import { BASE_URL } from '../util/config'

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
})

export async function getIp(): Promise<any> {
	return await instance.get("/test/client-ip")
		.then(value => {
			return value.data;
		}).catch(error => {
			console.error("API Error: " + error);
		})
}