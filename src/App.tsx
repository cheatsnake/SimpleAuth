import React, { FC } from 'react';
import Cookies from 'universal-cookie';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './styles/app.scss';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import RegPage from './pages/RegPage';


const App: FC = () => {

    const cookies = new Cookies();

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/login">
                        { !cookies.get('token') ?  <LoginPage cookies={cookies}/> : <Redirect to="/app"/> }
                    </Route>
                    <Route path="/register">
                        { !cookies.get('token') ?  <RegPage/> : <Redirect to="/app"/> }
                    </Route>
                    <Route path="/app">
                        { cookies.get('token') ? <AppPage cookies={cookies}/> : <Redirect to="/login"/> }
                    </Route>
                    <Redirect to="/app"/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;