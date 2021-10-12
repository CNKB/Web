import React from 'react';
import { hot } from 'react-hot-loader'
import './App.css';
import LoginPage from './page/LoginPage'

export default hot(module) (() => {
    return (
        <>
			<LoginPage />
		</>
    );
})
