import DefaultContainer from '../template/DefaultContainer'
import { Translate } from '../hook/Translator'
import '../css/Font.css'
import '../css/SignInPage.css'
import '../css/common.css'
import Logo from "../image/logo.png"
import GoogleSignIn from "../image/googleSignIn.png"
import useWindowSize from '../hook/Window'
import { useState, useEffect } from 'react'
import { signInWithRedirect, getRedirectResult } from "firebase/auth"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { CommonLoader, setToken, auth, provider } from '../util/config'
import { signIn } from '../api/UserApi'
import React from "react"

const SignInPage = () => {
    const { height, width } = useWindowSize()
    const $ = Translate()

    const [logoSize, setLogoSize] = useState(0)

    const [loading, setLoading] = useState(true)
    const [googleEnabled, setGoogleEnabled] = useState(false)

    useEffect(() => {
        getRedirectResult(auth).then(result => {
            if (result != null) {
                let email = result.user.email

                if (email) {
                    setGoogleEnabled(false)
                    signIn(email, result.providerId || "google.com")
                        .then((result: any) => {
                            let token = result.data.data.token
                            setToken(token)

                            setLoading(false)
                        })
                }
            } else {
                setGoogleEnabled(true)
                setLoading(false)
            }
        }).catch(error => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        setLogoSize(height * 0.22 + width * 0.17)
    }, [height])

    return (
        <DefaultContainer>
            <div id="FontBold" className="title">
                <img src={Logo} alt="logo" width={logoSize} />
                {
                    loading ? (
                        <>
                            <CommonLoader>
                                {{
                                    size: logoSize / 5
                                }}
                            </CommonLoader>
                        </>
                    ) : googleEnabled ? (
                        <div>
                            <button className="commonButton">
                                <img src={GoogleSignIn} key={GoogleSignIn}
                                    onClick={() => {
                                        if (googleEnabled) {
                                            setLoading(true)
                                            signInWithRedirect(auth, provider)
                                        }
                                    }}
                                >
                                </img>
                            </button>
                        </div>
                    ) : ( <div>
                        HI?
                    </div> )
            }
            </div>
        </DefaultContainer>
    )
}

export default SignInPage