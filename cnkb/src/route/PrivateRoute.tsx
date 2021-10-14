import { Route, Redirect } from "react-router-dom"
import { Component } from 'react'
import { SIGNED_IN } from "../util/config"

interface Props {
	component: Component,
	rest: {}
}

export default ({component, rest}: Props) => {
	return (
		<Route
			{...rest}
			render = {props => (
                SIGNED_IN ? (
                    <Component {...props} />
                ) : ( 
                    <Redirect to="/" />
                )
			)}
		/>
	)
}