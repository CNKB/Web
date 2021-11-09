import Response from "./Response";

interface Service {
	handleData(
		response: Response,
		$: (key: string, data?: string[] | undefined) => string,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>,
	): void;
}

export default Service;