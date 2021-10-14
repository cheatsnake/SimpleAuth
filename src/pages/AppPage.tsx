import React, { FC } from 'react';
import { LogoutButton } from '../components/Buttons';
import { Title } from '../components/Titles';

interface IAppPage {
    cookies: any,
    onLogout: Function
}

const AppPage: FC<IAppPage> = ({cookies, onLogout}) => {

    console.log(cookies);

    return (
        <div>
            <Title>Hello {cookies.cookies.user}!</Title>
            <LogoutButton func={onLogout}>Logout</LogoutButton>
        </div>
    );
};

export default AppPage;