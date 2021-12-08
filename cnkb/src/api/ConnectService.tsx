import Service from "./Service";
import ServiceProp from "./ServiceProp";

class ConnectService implements Service {
	handleData(props: ServiceProp): void{
		let data = props.response.data
		let version = data.version

		props.addMessage(props.$("game.version", [version]))
	}
}

export default ConnectService