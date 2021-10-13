import React, { FC } from 'react';
import { LogoutButton } from '../components/Buttons';
import { Title } from '../components/Titles';

interface IAppPage {
    cookies: any
}

const AppPage: FC<IAppPage> = ({cookies}) => {

    function onLogout() {
        cookies.remove('token');
        cookies.remove('user');
        window.location.reload();
    }
    
    return (
        <div>
            <Title>Hello {cookies.cookies.user}!</Title>
            <LogoutButton func={onLogout}>Logout</LogoutButton>
        </div>
    );
};

export default AppPage;