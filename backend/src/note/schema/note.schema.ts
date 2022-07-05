import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Note {
	@Prop({
		required : true
	})
	note_id : string;

	@Prop({
		required : true
	})
	title : string;

	@Prop()
	content : string;

	@Prop()
	user_id : string;
}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);