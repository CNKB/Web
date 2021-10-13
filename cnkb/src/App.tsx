import React from 'react';
import { hot } from 'react-hot-loader'
import './App.css';
import SignInPage from './page/SignInPage'

export default hot(module) (() => {
    return (
        <>
			<SignInPage />
		</>
    );
})
