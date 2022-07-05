import react from 'react';

import parse from 'html-react-parser'; 

import './NoteElement.css';

export default class NoteListElement extends react.Component{

	render() {
		
		return(
			<div className="note-element-container">
				<header>{this.props.note.title}</header>
				<div>{parse(this.props.note.content )}</div>
			</div>
		);
	}
}