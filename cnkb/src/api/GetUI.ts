import Response from "./Response";
import Service from "./Service";

class GetUI implements Service {
	handleData(
		response: Response,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
		setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>,
		setSidebarComponent: React.Dispatch<React.SetStateAction<JSX.Element>>,
	) {
		console.log("GetUI: " + response)
	}
}