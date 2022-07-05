import './ButtonBuilder.css';

export default function negativeButtonBuilder(props) {

	let onClickHandler = (event) => {
		event.preventDefault();
		props.callback();
	}


	return(
		<button id="negative-button" onClick={onClickHandler}>{props.message}</button>
	)

}