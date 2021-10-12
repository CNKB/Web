import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
 
import { LANGUAGE } from '../locale/language'
import { DEBUG } from './config';
 
async function loadLocaleMessages(currentLanguage: string) {
    let lang;
    if (currentLanguage === 'en') {
        lang = 'en_US'
    } else {
        lang = 'ko_KR'
    }
	
    const locale = await import(
        `../locale/${lang}.json`
    ).then(value => {
		return value.default;
	});

    return { [currentLanguage]: locale }
}
 
export let $: any = () => {}
 
export async function init(currentLanguage: string) {
    return i18n
        .use(initReactI18next)
        .init({
            debug: DEBUG,
            load: 'currentOnly',
            interpolation: {
                escapeValue: true,
                prefix: '{',
                suffix: '}',
            },
            lng: currentLanguage,
            fallbackLng: LANGUAGE.KO,
            resources: await loadLocaleMessages(currentLanguage)
        })
        .then(t => {
            $ = t
        })
}

export const getNativeInfo = (): Promise<INativeInfoResult> => {
	const result: INativeInfoResult = {
		result: {
			language: window.navigator.language
		}
	}

	return new Promise((resolve): void => {
		resolve(result);
	})
}

export interface INativeInfo {
	language: string
}

export const EmptyNativeInfo: INativeInfo = {
	language: ''
}

export interface INativeInfoResult {
	result: INativeInfo | null;
}