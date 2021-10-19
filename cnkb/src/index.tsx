import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { oc } from 'ts-optchain'
import * as i18n from './util/i18nUtil'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import SignInPage from './page/SignInPage'
import LobbyPage from './page/LobbyPage'

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

const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-in" component={SignInPage} />
                    <Route path="/lobby" component={LobbyPage} />
                    <Redirect path="*" to="/sign-in" />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById("root")
    )
}

reportWebVitals()

export default render