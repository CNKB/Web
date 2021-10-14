import { initializeApp } from "firebase/app"
import Loader from "react-loader-spinner"
import axios from 'axios'
import { getAuth, GoogleAuthProvider } from "firebase/auth"

export const DEBUG = true
export let SIGNED_IN = false
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

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	'login_hint': 'user@example.com'
})

export let instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true
})

export const setToken = (token: string) => {
	instance = axios.create({
		baseURL: BASE_URL,
		timeout: 10000,
		headers: {
			Authorization: `Bearer ${token}`
		},
		withCredentials: true,	
	})

	SIGNED_IN = true
}

export const removeToken = () => {
	instance = axios.create({
		baseURL: BASE_URL,
		timeout: 10000,
		withCredentials: true
	})

	SIGNED_IN = false
}

export interface Props {
	children?: any
}

interface CommonLoaderProps {
	children: any
}

export const CommonLoader = ({children}: CommonLoaderProps) => {
	return <>
		<Loader type="Oval"
			color="grey"
			width={children.size}
			height={children.size}
		/>
	</>
}