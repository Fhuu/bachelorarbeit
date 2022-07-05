import react from 'react';
import ReactQuill from 'react-quill';

import Button from '../../builder/PositiveButtonBuilder';
import BackButton from '../../builder/NegativeButtonBuilder';
import PromptMessage from '../../builder/PromptMessage';

import { saveNote, getNote } from '../../helper/database/Note';

import { withRouter } from 'react-router-dom';
import responseStatus from '../../helper/ResponseStatus';

class NoteEditor extends react.Component {

	constructor(props) {
		super(props);

		this.state = {
			dataReady : false,
			title : null,
			note : null,
			id : window.location.pathname.replace('/note/', ''),
			messages : [],
		};

		this.deleteMessage = () => {
			setTimeout(() => {
				let messages = this.state.messages;
				messages.splice(0, 1);
				this.setState({
					messages : messages
				})
			}, 2000);
		} 

	}

	componentDidMount() {
		let fetchNote = async () => {
			if(this.state.note == null){
				let start = new Date();
				let request = await fetch(`/v1/note/${this.state.id}`);
				console.log('fetch from database', (new Date()) - start);
				let response = await request.json();
				if(response != null) {
					this.setState({
						title : response.title,
						note : response.content,
						dataReady : true
					}, () => {console.log(this.state)})
				}
			}
		}

		fetchNote();
		
		// let start = new Date();
		// getNote(this.state.id, (data) => {
		// 	console.log(data);
		// 	let date = new Date(); 
		// 	console.log(date - start, date, start);
		// 	if(data) 
		// 		return this.setState({
		// 			title : data.title,
		// 			note : data.content,
		// 			dataReady : true
		// 		}, () => {let date = new Date(); console.log(date - start, date, start);});
			
		// 	this.setState({
		// 		title : '',
		// 		note: '',
		// 		dataReady : true
		// 	});
		// });

	}

	titleChangeHandler = () => {
		let title = document.getElementById('title').value;
		this.setState({
			title : title,
		}, () => {

			let noteObj = {
				'id' : this.state.id,
				'title' : title,
				'content' : this.state.note
			};

			saveNote(noteObj);

		})
	}
	
	contentChangeHandler = (text) => {
		this.setState({
			note : text
		}, () => {
			
			let noteObj = {
				'id' : this.state.id,
				'title' : this.state.title,
				'content' : text
			};

			saveNote(noteObj);
			
		}); 
	}

	renderNote = () => {
		if(!this.state.dataReady) return <p>Loading</p>;
		
		return (
			<>
				<input type="text" id="title" className="w-full bg-white p-2 text-center outline-none text-black" onChange={this.titleChangeHandler} value={this.state.title}/>
				<ReactQuill value={this.state.note} onChange={this.contentChangeHandler} />
			</>
		);

	}

	syncToServer = async () => {
		let syncRequest = await fetch('/v1/note', {
			method: 'POST',
			headers : {
				'content-type' : 'application/json',
			},
			body : JSON.stringify({
				id : this.state.id,
				title : this.state.title,
				content : this.state.note
			})
		});

		let onsuccess = () => {
			document.getElementById('message').innerHTML = <p>Note uploaded</p>;
		};

		responseStatus(syncRequest, onsuccess);
		// if(syncRequest.status === 403) window.location.replace('/login');

		// if(syncRequest.status === 200) document.getElementById('message').innerHTML = <p>Note uploaded</p>;

		this.addMessage();
	}

	addMessage = () => {
		let messages = this.state.messages;
		messages.push(<PromptMessage key={this.state.messages.length + 1} message="this is a message" />);

		this.setState({
			messages : messages
		}, () => {
			this.deleteMessage();
		});
	}

	renderMessages = () => {

		return(
			<>
				{
					this.state.messages.map(element => {
						return element;
					})
				}
			</>
		);
	}

	render() {

		return(
			<>
				{this.renderMessages()}
				<div className="flex justify-between items-center pb-2">
					<BackButton message="Back" callback={() => {this.props.history.goBack()}}/>
					<Button message="sync" callback={this.syncToServer}/>
				</div>
				{this.renderNote()}
				<div id="message"></div>
			</>
		);
	}
}

export default withRouter(NoteEditor);