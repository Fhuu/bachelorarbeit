import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';
import { Task } from './interface/task.interface';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel : Model<Task>) {

    }

    async getAll() : Promise<Task[]> {
        return await this.taskModel.find({});
    }

    async create(task : TaskDto, user_id : string) : Promise<Task> {
        console.log(new Date(task.start_time).toUTCString());
        try {
            let newTask = new this.taskModel({
                title : task.title,
                user_id : user_id,
                start_time : task.start_time,
            });
    
            newTask = await newTask.save();
            
            return newTask;
        } catch(error) {
            console.log('error', error)
            return error;
        }
        
    }

    async changeTaskCompletion(task_id : string, user_id : string) : Promise<Task> {
        let foundTask = await this.taskModel.findOne({_id : task_id, user_id : user_id});
        return await foundTask.updateOne({completed : !foundTask.completed});
    }

    async getUserTask(user_id : string) : Promise<Task[]> {
        return await this.taskModel.find({user_id : user_id}).sort({'start_time' : 1});
    }

    async getTaskToday(user_id : string, date : string) : Promise<Task[]> {
        let currentDate = new Date(date);
        let nextDate = new Date(date);

        nextDate.setDate(currentDate.getDate() + 1);
        return await this.taskModel.find(
            {
                user_id : user_id, 
                start_time : {
                    '$gte' : currentDate,
                    '$lt' : nextDate
                }
            }
        );
    }

    async deleteTask(id : string) : Promise<Task> {
        return await this.taskModel.findByIdAndDelete(id);
    }
}
