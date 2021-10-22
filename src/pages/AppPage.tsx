import React, { FC } from 'react';
import { LogoutButton } from '../components/Buttons';
import { Title } from '../components/Titles';

interface IAppPage {
    cookies: any,
    onLogout: Function
}

const AppPage: FC<IAppPage> = ({cookies, onLogout}) => {

    return (
        <div className="app__block">
            <Title>Hello {cookies.cookies.user}!</Title>
            <LogoutButton func={onLogout}>Logout</LogoutButton>
        </div>
    );
};

export default AppPage;