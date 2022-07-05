import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoteDto } from './dto/note.dto';
import { NoteService } from './note.service';
import { Note } from './schema/note.schema';
import secret from 'src/helper/secret';
import * as jwt from 'jsonwebtoken'; 

@Controller('/v1/note')
export class NoteController {

	constructor(private readonly NoteService : NoteService) {}

	@Get('/all')
	async getNotes() : Promise<Note[]> {
		return await this.NoteService.getAll();
	}

	@Get('/all/fileSystem')
	async getNotesDir(@Req() req : Request) : Promise<NoteDto[]> {
		return await this.NoteService.getAllFromDirectory(jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
	}

	@Get('/:note_id')
	async getNote(@Param('note_id') note_id : string)  : Promise<Note> {
		return await this.NoteService.getNote(note_id);
	}

	@Get('/file/:note_id')
	async getNoteFromFile(@Req() req : Request, @Param('note_id') note_id : string)  : Promise<NoteDto> {
		return await this.NoteService.getNoteFromFile(jwt.verify(req.cookies.id, secret.jwtsecret)['id'], note_id);
	}

	@Post('')
	async uploadNote(@Body() note : NoteDto, @Req() req : Request) : Promise<Note> {
		await this.NoteService.addNoteToDatabase(note, req.user.toString());
		return await this.NoteService.addNoteToFileSystem(note, req.user.toString());
	}

	@Get('/repo/:note_id/diff')
	async getRepositoryDifference(@Param('note_id') note_id : string, @Req() req : Request) : Promise<string> {
		return (await this.NoteService.getDifference(note_id, req.user.toString())).toString();
	}

	@Get('/repo/:note_id/history')
	async getRepositoryHistory(@Param('note_id') note_id : string, @Req() req : Request) : Promise<string> {
		return (await this.NoteService.getHistory(note_id, req.user.toString())).toString();
	}

	@Get('/delete-all')
	async deleteAllNote() {
		return await this.NoteService.deleteAll();
	}
}
