import React from 'react';

export default class ButtonBuilder extends React.Component {
	
	OnClickHandle = () => {
		this.props.callback();
	}
	
	render() {
		return(
			<button>{this.props.message}</button>
		);
	}
}