export default function promptMessageBuilder (props) {

	let containerStyle = {
		zIndex : "2",
		color : "#fffc",
		backgroundColor: "#24755dff",
		position : "fixed",
		minWidth : "25vw",
		maxWidth : "75vw",
		textAlign : "right",
		padding : "0",
		margin : "0 1rem 0 0",
		right: "0",
		display : "flex",
		flexDirection : "row-reverse",
		justifyContent : "space-between",
		alignItems : "center",
		columnGap : "1rem"
	}

	let messageStyle = {
		padding : "0.5rem 1rem 0.5rem 0",
	}

	let closeButtonStyle = {
		textAlign : "center",
		margin: "0 0 0 1rem",
		padding : "0.25rem 0.5rem",
		cursor : "pointer",
	}

	return(
		<div style={containerStyle}>
			<p style={messageStyle}>{props.message}</p>
			<p style={closeButtonStyle}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
					<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</p>	
		</div>
	);
}