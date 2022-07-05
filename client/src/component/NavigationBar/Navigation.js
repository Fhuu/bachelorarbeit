import React from 'react';
import { Link } from 'react-router-dom';
import personimg from '../../assets/images/person-placeholder.jfif' ;

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user : 'loading'
		}
	}

	componentDidMount = async () => {
		let userRequest = await fetch('/v1/user', {method: 'GET'});
		switch(userRequest.status) {
			case 200 :
				this.setState({
					user : (await userRequest.json()).user.username
				});
				break;

			default : 
				this.setState({
					user : null
				});
				break;
		}
		
	}

	renderAuthNavigation = () => {
		if(this.state.user === 'loading') 
			return <li className="mx-6"><Link to="/user"><img className="w-6 h-6 rounded-full" alt="loading" src={personimg}/></Link></li>;

		if (this.state.user == null) 
			return <li className="mx-6"><Link to="/login">Login</Link></li>;

		return <li className="mx-6"><Link to="/user"><img className="w-6 h-6 rounded-full" src={personimg} alt={this.state.user} title={this.state.user}/></Link></li>;
	}

	render() {
		return(
			<div className="flex justify-between items-end py-4">
				<div></div>
				<ul className="flex justify-around">
					<li className="mx-6"><Link to="/home">Home</Link></li>
					<li className="mx-6"><Link to="/task">Task</Link></li>
					<li className="mx-6"><Link to="/note">Note</Link></li>
					{this.renderAuthNavigation()}
				</ul>
			</div>
		);
	}
}