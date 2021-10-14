import React, { FC, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
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
        cookies.remove('token');
        cookies.remove('user');
        setUpdate(!update);
    }

    function onLogin(result: {token: string, username: string}) {
        cookies.set('token', result.token, { path: '/SimpleAuth' });
        cookies.set('user', result.username, { path: '/SimpleAuth' });
        setUpdate(!update);
    }
    

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/SimpleAuth/login">
                        { !cookies.get('token') ?  
                            <LoginPage cookies={cookies} onLogin={onLogin}/> : 
                            <Redirect to="/SimpleAuth/app"/> }
                    </Route>
                    <Route path="/SimpleAuth/register">
                        { !cookies.get('token') ?  
                            <RegPage/> : 
                            <Redirect to="/SimpleAuth/app"/> }
                    </Route>
                    <Route path="/SimpleAuth/app">
                        { cookies.get('token') ? 
                            <AppPage cookies={cookies} onLogout={onLogout}/> : 
                            <Redirect to="/SimpleAuth/login"/> }
                    </Route>
                    <Redirect to="/SimpleAuth/app"/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;