import { useTranslation } from "react-i18next"

export function Translate() {
	const { t } = useTranslation()

	return function $(key: string, data?: string[]): string {
		return t(key, Object.assign({}, data))
	}
}