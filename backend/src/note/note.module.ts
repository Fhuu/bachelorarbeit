import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { NoteSchema } from './schema/note.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : 'Note', schema : NoteSchema}]), MongooseModule.forFeature([{name : 'User', schema : UserSchema}])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
