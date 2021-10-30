import React, { FC, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/app.scss';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';


const App: FC = () => {

    const [update, setUpdate] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        return () => setUpdate(true)
    }, [])

    function onLogout() {
        cookies.remove('token', { path: '/' });
        cookies.remove('user', { path: '/' });
        setUpdate(!update);
    }

    function onLogin(result: {token: string, username: string}): void {
        cookies.set('token', result.token, { path: '/' });
        cookies.set('user', result.username, { path: '/' });
        setUpdate(!update);
    }

    return (
        <div className="app">
            <Switch>
                <Route path="/login">
                    { !cookies.get('token') ?  
                        <LoginPage onLogin={onLogin}/> : 
                        <Redirect to="/app"/> }
                </Route>
                <Route path="/register">
                    { !cookies.get('token') ?  
                        <RegPage/> : 
                        <Redirect to="/app"/> }
                </Route>
                <Route path="/app">
                    { cookies.get('token') ? 
                        <AppPage cookies={cookies} onLogout={onLogout}/> : 
                        <Redirect to="/login"/> }
                </Route>
                <Redirect to="/app"/>
            </Switch>
        </div>
    );
};

export default App;