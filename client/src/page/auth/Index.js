import React from 'react';

import LoginForm from '../../component/Auth/Login/Form';
import SignUpForm from '../../component/Auth/Signup/Form';
import responseStatus from '../../helper/ResponseStatus';

export default class Auth extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			shouldRender : false
		}
	}

	async componentDidMount() {
		let authorizationRequest= await fetch('/v1/user', {method: 'GET'});

		let onsuccess = () => {
				window.location.replace('/home');
			};

		let onunauthorized = () => {
			this.setState({
				shouldRender : true
			});
		};

		responseStatus(authorizationRequest, onsuccess, onunauthorized);
	}

	componentRender = () => {
		switch(this.props.path) {
			case 'login' :
				return <LoginForm />;
			case 'signup' :
				return <SignUpForm />;
			default :
				return;
		}
	}

	render() {
		return(
			<div>
				{
					this.state.shouldRender ?
					this.componentRender() : 	
					<p>Loading...</p> 
				}
			</div>
		);
	}
}