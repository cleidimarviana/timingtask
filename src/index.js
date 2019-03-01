import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Relatorios from './Relatorios';

ReactDOM.render( <BrowserRouter>
    <Switch>
        <Route exact path="/" exact={true} component={App} />
        <Route path="/relatorios" component={Relatorios} />
    </Switch>
</ BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

