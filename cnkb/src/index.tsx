import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { oc } from 'ts-optchain'
import * as i18n from './util/i18nUtil'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import SignInPage from './page/SignInPage'

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
    hot(module) (() => {
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={SignInPage} />
                        <Redirect path="*" to="/" />
                    </Switch>
                </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
        )
    })
}

reportWebVitals()