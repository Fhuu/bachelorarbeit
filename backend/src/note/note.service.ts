import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { INote } from './interface/note.interface';
import { NoteDto } from './dto/note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schema/note.schema';
import { execSync } from 'child_process';
import { commitChange, getNoteDirectory, initGit, writeNoteToFileSystem } from '../helper/repository.helper';
import { User } from 'src/user/schema/user.schema';
import { readdirSync, readFileSync } from 'fs';
import { getUserDir, getNotePath } from '../helper/repository.helper';

@Injectable()
export class NoteService {

	constructor(@InjectModel('Note') private readonly NoteModel : Model<Note>, @InjectModel('User') private readonly UserModel : Model<User>) {}

	async getAllFromDirectory(userId : string) : Promise<NoteDto[]> {
		let notesDirectory = readdirSync(getUserDir(userId));
			if(notesDirectory.length < 1) return;

			let noteCollectionObject = [];
			for(let index in notesDirectory) {
				let note = readFileSync(`${getNotePath(userId, notesDirectory[index])}/note.html`).toString('utf-8');
				noteCollectionObject.push({
					id : notesDirectory[index],
					title : 'none',
					content : note
				});
			}

			return noteCollectionObject;
	}

	async getAll() : Promise<Note[]> {
		

		try {

			let notes = this.NoteModel.find();
			return notes;

		} catch(error) {
			return error;
		}
	}

	async getNote(noteId : string) : Promise<Note> {
		let note = this.NoteModel.findOne({note_id : noteId});

		return await note;
	}

	async getNoteFromFile(userId : string, noteId : string) : Promise<NoteDto> {
		let path = getNotePath(userId, noteId);
		let file = readFileSync(`${path}/note.json`).toString('utf-8');

		return JSON.parse(file);
	}

	async addNoteToDatabase(note : NoteDto, userId : string) : Promise<Note> {

		let newNote = new this.NoteModel({
			note_id : note.id,
			title : note.title,
			content : note.content
		});

		let savedNote = await newNote.save();

		console.log(savedNote);

		return newNote;
	}


	async addNoteToFileSystem(note : NoteDto, userId : string) : Promise<Note> {

		try {
			var email = (await this.UserModel.findById(userId)).email;
		} catch(err) {
			return err;
		}

		try {

			return writeNoteToFileSystem(userId, note.id, note.title, note.content, email);

		} catch(error) {
			
			return error;
		
		}
	}	

	async getDifference(note_id: string, userId : string) : Promise<string> {
		let noteDirectory = getNoteDirectory(userId, note_id);

		let command = execSync(`cd ${noteDirectory} && git diff`);
		console.log(command.toString());

		return command.toString();
	}

	async getHistory(note_id : string, userId : string) : Promise<string> {
		let noteDirectory = getNoteDirectory(userId, note_id);

		try {
			let command = execSync(`cd ${noteDirectory} && git log`);
	
			return command.toString();
		} catch(err) {
			return err;
		}

	}

	async deleteAll() : Promise<{}> {
		let result = await this.NoteModel.deleteMany();
		return result;
	}
}
