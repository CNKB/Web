import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LANGUAGE_FOR_OS } from './types'

import langEn from './lang.en.json'
import langKo from './lang.ko.json'

const resources = {
	[LANGUAGE_FOR_OS.EN]: { translation: langEn },
	[LANGUAGE_FOR_OS.KO]: { translation: langKo }
}

const init = (language: string) => {
	i18n.use(initReactI18next)
		.init({
			resources,
			fallbackLng: 'en-US',
			debug: true,
			interpolation: {
				escapeValue: true,
				prefix: '{',
				suffix: '}'
			},
			lng: language
		})
}

export default init;