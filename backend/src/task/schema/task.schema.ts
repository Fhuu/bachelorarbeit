import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop({
        required: true,
        default: false
    })
    completed: boolean;

    @Prop({
        index: true
    })
    user_id : string;

    @Prop({
        default: new Date()
    })
    start_time : Date;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);