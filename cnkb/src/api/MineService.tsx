import Service from "./Service";
import ServiceProp from "./ServiceProp";

class MineService implements Service {
	handleData(props: ServiceProp): void{
		const { status, data } = props.response
		
		if(status === 200) {
			const beforeMap = data["before"]
			const minedMap = data["mined"]

			let before, mined;
			for (let key of Object.keys(minedMap)) {
				before = beforeMap[key]
				mined = minedMap[key]

				props.addMessage(`${props.$(key)} ${mined}개를 캤습니다 (${before} -> ${before + mined})`)
			}
		}
	}
}

export default MineService