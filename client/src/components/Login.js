import React from 'react';
import './style/Login.css';

import { Redirect  } from "react-router-dom";
var SHA256 = require("crypto-js/sha256");

class Login extends React.Component {

	static notifyText = '';
	static showNotify = false;
	static notifyClass = "w3-dark-grey";

	constructor(props) {
		super(props);
		this.state = {
			usernameErr: false,
			passwordErr: false,
		}
	}

	render() {
		if(sessionStorage.getItem('isValidLogin') === "true" && sessionStorage.getItem('sessionId') !== "undefined") {
			return (<Redirect to="/home"/>);
		}
		else
			return (
				<div>
					<div className={(Login.showNotify ? "w3-animate-opacity" : "hidden-opacity") + " w3-panel w3-margin w3-display-bottomleft w3-border w3-border-dark-grey overlay "+Login.notifyClass }>
					{Login.notifyText.split('\n').map((item, i) => <p key={i}>{item}</p>)}
					</div>

					<div className="w3-Login w3-display-middle w3-border w3-border-blue w3-padding w3-white login-body">
						<div className="w3-Login w3-border-bottom w3-center">
						  <h1 className="w3-text-pink">Login</h1>
						</div>

						<div className="w3-Login w3-center">
							<p>
			         <label>Username</label>
							 <input placeholder="Insert username" className={(this.state.usernameErr ? "w3-border w3-border-red" : "") +" w3-input login-input"} ref="usernameInput" type="text" onChange={() => this.validateUername(this.refs.usernameInput.value)} onKeyDown={(e) => this.handleLogin(this.refs.usernameInput.value,this.refs.passwordInput.value,e)}/>
							</p>

							<p>
							 <label>Password</label>
							 <input placeholder="Insert password" className={(this.state.passwordErr ? "w3-border-red" : "") + " w3-input login-input"} ref="passwordInput" type="password" onChange={() => this.validatePassword(this.refs.passwordInput.value)} onKeyDown={(e) => this.handleLogin(this.refs.usernameInput.value,this.refs.passwordInput.value,e)}/>
							</p>
			       </div>
						 <div className="w3-Login w3-padding w3-center">
						 	<button className="login-button w3-btn w3-blue w3-margin" onClick={() => this.handleLogin(this.refs.usernameInput.value,this.refs.passwordInput.value)}>Login</button>
							<button className="login-button w3-btn w3-border w3-border-pink w3-margin w3-center" onClick={() => this.handleSignUp(this.refs.usernameInput.value,this.refs.passwordInput.value)}>Sign up</button>
						</div>
					</div>
				</div>
			);
	}

	validateUername(username) {
			this.setState({usernameErr: username.length>32 || username.length < 5});
	}

	validatePassword(password) {
			this.setState({passwordErr: password.length>32 || password.length < 5});
	}

	handleLogin(username,password,e) {
		if(e !== undefined)
			if(e.key !=="Enter")
				return;

		this.validateUername(username);
		this.validatePassword(password);

		if(this.state.usernameErr) {
			this.handleNotify("Username is not valid","w3-red");
			this.setState({});
			return;
		}
		if(this.state.passwordErr) {
			this.handleNotify("Password is not valid","w3-red");
			this.setState({});
			return;
		}

		fetch('/login',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"username": username,
				"password": SHA256(password).toString()
			})
		})
		.then(res => res.json())
		.then(result => {
			if(result.valid) {
				sessionStorage.setItem('isValidLogin',result.valid);
				sessionStorage.setItem('sessionId',result.sessionId);
				this.setState({});
			}
			else {
				sessionStorage.setItem('isValidLogin',"false");
				sessionStorage.setItem('sessionId',"");
				this.handleNotify("Username or password not valid","w3-red");
				this.setState({usernameErr:true,passwordErr:true});
			}
		});
	}

	handleSignUp(username,password) {

		this.validateUername(username);
		this.validatePassword(password);

		if(this.state.usernameErr) {
			this.handleNotify("Username is not valid","w3-red");
			this.setState({});
			return;
		}
		if(this.state.passwordErr) {
			this.handleNotify("Password is not valid","w3-red");
			this.setState({});
			return;
		}

		fetch('/signUp',{
			 method: 'post',
			 headers: {'Content-Type':'application/json'},
			 body: JSON.stringify({
				"username": username,
				"password": SHA256(password).toString()
			})
		})
		.then(res => res.json())
		.then(result => {

			this.handleNotify(result.err === "usr_alr_exs" ? "Username already used" : "Sign Up successful\nYou can now login",result.err === "usr_alr_exs" ? "w3-red" : "w3-green");
			this.setState({});
		});

	}

	handleNotify(text,className) {
		Login.notifyText = text;
		Login.showNotify = true;
		Login.notifyClass = className;

		if(Login.notifyTimeoutFunction)
			clearTimeout(Login.notifyTimeoutFunction)

	 Login.notifyTimeoutFunction =	setTimeout(function(){
			Login.showNotify = false;
      this.setState({});
        }.bind(this),3 * 1000);
	}
}

export default Login;
