import DefaultContainer from '../template/DefaultContainer'
import { Translate } from '../hook/Translator';
import '../css/Font.css'
import '../css/SignInPage.css'
import Logo from "../image/logo.png"
import useWindowSize from '../hook/Window';
import { getIp } from '../api/CommonApi';
import { useState, useEffect, useCallback } from 'react';

const SignInPage = () => {
	const { height, width } = useWindowSize();
    const $ = Translate();

    const [ip, setIp] = useState('');

    const handleIp = useCallback(async() => {
       const { data } = await getIp()
       setIp(data)
    },[])

    useEffect(() => {
        handleIp()
    }, []);

    return (
        <DefaultContainer>
            <div id="FontBold" className="title">
                <img src={Logo} className="logo"
                    alt="logo"
                    width={height * 0.22 + width * 0.17}
                    style={{
                        alignSelf: "center"
                    }}>
                </img>
                <div>
                    ip: {ip}
                </div>
            </div>
        </DefaultContainer> 
    );
}

export default SignInPage;