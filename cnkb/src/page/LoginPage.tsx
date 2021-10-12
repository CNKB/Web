import { useTranslation } from 'react-i18next';
import DefaultContainer from '../template/DefaultContainer'

const LoginPage = () => {
    const { t } = useTranslation();

    return (
        <DefaultContainer>
            {t('translate.test')}
        </DefaultContainer> 
    );
}

export default LoginPage;