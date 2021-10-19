import DefaultContainer from '../template/DefaultContainer'
import '../css/Font.css'
import '../css/SignInPage.css'
import '../css/common.css'
import Logo from "../image/logo.png"
import GoogleSignIn from "../image/googleSignIn.png"
import useWindowSize from '../hook/Window'
import { useState, useEffect } from 'react'
import { signInWithRedirect, getRedirectResult } from "firebase/auth"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { CommonLoader, auth, provider, getData, setData } from '../util/config'
import { signIn } from '../api/UserApi'
import React from "react"
import { Redirect } from 'react-router-dom'

const SignInPage = () => {
    const { height, width } = useWindowSize()

    const [logoSize, setLogoSize] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRedirectResult(auth).then(result => {
            if(getData("accessToken")) {
                return;
            }

            if (result != null) {
                let email = result.user.email

                if (email) {
                    signIn({
                        email: email,
                        provider: result.providerId || "google.com"
                    }).then((result: any) => {
                        let data = result.data.data
                        setData("accessToken", data.accessToken);
                        setData("refreshToken", data.refreshToken);

                        setLoading(false)
                    })
                }
            } else {
                setLoading(false)
            }
        }).catch(error => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        setLogoSize(height * 0.22 + width * 0.17)
    }, [height, width])

    return (
        getData("accessToken") ? (
            <Redirect to="/lobby" />
        ) : (
            <DefaultContainer>
                <div id="FontBold" className="sign-in-title">
                    <img src={Logo} alt="logo" width={logoSize} />
                    <div className="center">
                        <CommonLoader>
                            {{
                                flag: loading,
                                size: logoSize / 5,
                                element: (
                                    <button className="commonButton">
                                        <img src={GoogleSignIn} key={GoogleSignIn} alt="signIn"
                                            onClick={() => {
                                                setLoading(true)
                                                signInWithRedirect(auth, provider)
                                            }}
                                            width={logoSize / 1.5}
                                        >
                                        </img>
                                    </button>
                                )
                            }}
                        </CommonLoader>
                    </div>
                </div>
            </DefaultContainer>
        )
    )
}

export default SignInPage