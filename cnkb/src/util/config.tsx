import { initializeApp } from "firebase/app"
import axios from 'axios'
import { getAuth, GoogleAuthProvider } from "firebase/auth"

export const DEBUG = true
export const SOCKET_URL = "ws://127.0.0.1:8080/ws"
const BASE_URL = "http://127.0.0.1:8080"

const firebaseConfig = {
    apiKey: "AIzaSyCaRPauFofbnzUlZpXPc_bXZ9zYSfm7Uwc",
    authDomain: "cnkb-70f94.firebaseapp.com",
    projectId: "cnkb-70f94",
    storageBucket: "cnkb-70f94.appspot.com",
    messagingSenderId: "308873332138",
    appId: "1:308873332138:web:eb5a7cb3697d33d920d7d3",
    measurementId: "G-G5T4WWT9PR"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

let instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

let lastHeaderKeys: string[] = []

export let getInstance = (token?: string | null, header?: any) => {
	for (let key of lastHeaderKeys) {
		delete instance.defaults.headers.common[key]
	}

	lastHeaderKeys = []

	if(token) {
		instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete instance.defaults.headers.common["Authorization"];
	}

	if(header) {
		lastHeaderKeys = Object.keys(header)

		for (let [key, value] of Object.entries(header)) {
			instance.defaults.headers.common[key] = value as string
		}
	}

	return instance
}

export let getSocketData = (request: string, data?: {}) => {
	let output = {
		playerId: Number(getData("playerId")),
		request: request,
		accessToken: getData("accessToken"),
		data: {
			...data
		}
	}

	return JSON.stringify(output)
}

export const setData = (key: string, value: string) => {
	window.localStorage.setItem(key, value)
}

export const getData = (key: string) => {
	return window.localStorage.getItem(key)
}

export const removeData = (key: string) => {
	window.localStorage.removeItem(key)
}