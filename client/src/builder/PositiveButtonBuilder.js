import './ButtonBuilder.css';

export default function positiveButtonBuilder(props) {
	
	let OnClickHandle = (event) => {
		event.preventDefault();
		props.callback();
	}

	if(props.style) {
		return (
			<button style={props.style} onClick={OnClickHandle} id="confirm-button">{props.message}</button>
		);
	}
	
	return(
		<button onClick={OnClickHandle} id="confirm-button">{props.children == null ? props.message : props.children}</button>
	);
}