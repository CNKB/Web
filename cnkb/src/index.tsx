import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignInPage from './page/SignInPage';
import reportWebVitals from './reportWebVitals';
import { oc } from 'ts-optchain'
import * as i18n from './util/i18nUtil'

window.onload = async() => {
    try{
        const { result } = await i18n.getNativeInfo() 
        const nativeLang = oc(result).language()
 
        await i18n.init(nativeLang as string)

        render()
    } catch (e) {
        console.error(e)
    }
}

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <SignInPage />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

reportWebVitals();