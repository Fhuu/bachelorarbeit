import React from 'react';
import LogoutForm from '../../component/Auth/Logout/Form';
import checkAuth from '../../helper/Auth';

export default class User extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			user : {
				username : null,
				email : null
			}
		}
	}
	
	async componentDidMount () {
		let user = await checkAuth();

		this.setState({user : user}, () => {
			console.log(this.state.user);
		});
	}

	render () {
		return(
			<div>
				<div>
					{this.state.user.username}
				</div>
				<div>
					{this.state.user.email}
				</div>
				<div>
					<LogoutForm />
				</div>
			</div>
		);
	}
}