import DefaultContainer from '../template/DefaultContainer'
import { Translate } from '../hook/Translator';

const LoginPage = () => {
    const $ = Translate();

    return (
        <DefaultContainer>
            {$('translate.test', ["123"])}
        </DefaultContainer> 
    );
}

export default LoginPage;