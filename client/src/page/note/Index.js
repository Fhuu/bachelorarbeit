import { useEffect, useState } from 'react';

import { v4 } from 'uuid';

import Note from '../../component/Note/NoteListElement';
import { getAllNote } from '../../helper/database/Note';

import './quill-editor.css';

import { Link } from 'react-router-dom';

export default function NoteIndex(props) {

	const [notes, setNotes] = useState(null);
	const [dataReady, setDataReady] = useState(false);

	useEffect(() => {
		if(!notes) getAllNote(updateNote);
	});

	let updateNote = (data) => {
		setNotes(data);
		setDataReady(true);
	}

	let renderNoteList = () => {
		if(!dataReady) return <span>Loading</span>
		
		return ( 
			<div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
				{	
					notes.reverse().map(note => {
						return (
							<Link key={note.id} style={{minHeight: '16rem'}} to={`/note/${note.id}`}><Note note={note} /></Link>
						)
					})
				}
			</div>
		);
	}
	
	let addButton = () => {
		return (
			<Link className="mb-2 flex justify-center items-center" to={`/note/${v4()}`}>
				<svg xmlns="http://www.w3.org/2000/svg" width="56" height="28" fill="#2229" className="bi bi-plus-circle bg-white p-1 rounded-full" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
				</svg>
			</Link>
		);
	}

	return(
		<>
			{addButton()}
			{renderNoteList()}
			<span id="db-message"></span>
		</>
	);
}