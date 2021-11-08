import Response from "./Response";

interface Service {
	handleData(
		response: Response,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>,
		setSidebarComponent: React.Dispatch<React.SetStateAction<JSX.Element>>
	): void;
}

export default Service;