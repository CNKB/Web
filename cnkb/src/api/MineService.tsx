import Service from "./Service";
import ServiceProp from "./ServiceProp";

class MineService implements Service {
	handleData(props: ServiceProp): void{
		// let {status, data} = props.response
		props.addMessage(JSON.stringify(props.response))
	}
}

export default MineService