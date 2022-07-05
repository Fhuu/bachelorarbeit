import { join } from 'path';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { exec, execSync } from 'child_process';
import { INote } from 'src/note/interface/note.interface';

export function getDir() {
	return join(__dirname, '..', '..', 'repositories');
}

export function getUserDir(userId) {
	return join(getDir(), userId);
}

export function getNotePath(userId, noteId) {
	return join(getDir(), userId, noteId);
}

export function getNoteDirectory(user_id : string, note_id : string, email : string = null) : string {
	let userDirectory = getUserDir(user_id);
	let noteDirectory = getNotePath(user_id, note_id);

	if(!existsSync(userDirectory)) {
		mkdirSync(userDirectory);
	}

	if(!existsSync(noteDirectory)){
		mkdirSync(noteDirectory);
		initGit(noteDirectory, email, user_id);
	}
	
	return noteDirectory;
}

export function initGit(path : string, email : string, name : string) {
	execSync(`cd ${path} && git init && git config user.email "${email}" && git config user.name "${name}"`);
}

export async function writeNoteToFileSystem(user_id : string, note_id : string, title : string, content : string, email : string) {
	
	let noteObject = JSON.stringify({
		title : title,
		content : content
	});

	try {
		let noteDir = (await getNoteDirectory(user_id, note_id, email)).toString();
		let writeStream = createWriteStream(join(noteDir, 'note.json'), {flags : 'w'});
		
		writeStream.write(noteObject);
		writeStream.close();

		commitChange(user_id, note_id);

		return noteDir;		
	} catch(error) {
		console.log(error);
		return error;
	}

}
 
export async function commitChange(user_id : string, note_id : string) {
	
	let noteDirectory = (await getNoteDirectory(user_id, note_id)).toString();

	exec(`cd ${noteDirectory} && git add . && git commit -m "initial commit"`, (err, stdout, stderr) => {
		if (err) console.log(`err ${err}`);

		if(stdout) console.log(`stdout ${stdout}`);

		if(stderr) console.log(`stderr ${stderr}`);
	});
}