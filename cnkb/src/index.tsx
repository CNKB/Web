import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './lang/i18n'
import './index.css';
import LoginPage from './page/LoginPage';
import reportWebVitals from './reportWebVitals';

window.onload = () => {
    console.log('language: ', window.navigator.language);
    render(window.navigator.language);
}

function render(language: string) {
    ReactDOM.render(
        <React.StrictMode>
            <I18nextProvider i18n={i18n(language) as any}>
                <LoginPage />
            </I18nextProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
