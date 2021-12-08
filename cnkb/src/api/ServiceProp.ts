import Response from "./Response";

interface ServiceProp {
	response: Response,
	$: (key: string, data?: string[] | undefined) => string,
	addMessage: (message: string) => void,
}

export default ServiceProp