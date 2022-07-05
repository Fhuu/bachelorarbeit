import react from 'react';
import NegativeButton from '../../../builder/NegativeButtonBuilder';

export default class LogoutForm extends react.Component {

	clickHandler = async () => {
		let logoutRequest = await fetch('/v1/user/logout', {
			method : 'GET'
		});

		if(logoutRequest.status === 200) window.location.reload();
	}

	render() {
		return(
			<div>
				<NegativeButton message="Logout" callback={this.clickHandler}/>
			</div>
		);
	}
}