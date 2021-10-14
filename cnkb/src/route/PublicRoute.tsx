import { Component, ComponentType } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { SIGNED_IN } from '../util/config'

interface Props {
	exact?: boolean,
	path: string,
	component: ComponentType<any>,
	restricted: boolean
}

export default ({component: Component, restricted, ...otherProps}: Props) => {
	return (
		<Route
			render = {otherProps => (
				SIGNED_IN && restricted ? (
					<Redirect to="/game" />
				) : (
					<Component {...otherProps} />
				)
			)}
		/>
	)
}