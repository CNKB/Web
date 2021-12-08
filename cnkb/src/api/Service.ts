import Response from "./Response";
import ServiceProp from "./ServiceProp";

interface Service {
	handleData(props: ServiceProp): void;
}

export default Service;