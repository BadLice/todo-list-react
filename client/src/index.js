import React from 'react';
import './index.css';
import Container from './components/Container';
import Error from './components/Error'
import Login from './components/Login';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route,Redirect  } from "react-router-dom";

ReactDom.render(
	<Router>
	<Route path="/*" render={() => <Redirect to="/login"/>} />
		<Route path="/" exact render={() =>
			!sessionStorage.getItem('isValidLogin') ? (<Redirect to="/login"/>) : (<Redirect to="/home"/>)} />
		<Route path="/home" component={Container} />
		<Route path="/login" component={Login} />
		<Route path="/error" component={Error} />
	</Router>,
	document.getElementById('root')
);
