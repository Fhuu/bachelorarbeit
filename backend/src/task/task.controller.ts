import { Body, Controller, Get, Post, Delete, Injectable, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { Task } from './interface/task.interface';
import { TaskDto } from './dto/task.dto';
import * as jwt from 'jsonwebtoken';
import secret from 'src/helper/secret';
import parser from 'src/helper/parser.helper';

@Controller('/v1/task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @Get()
    async findAll(@Req() req: Request, @Res({passthrough: true}) res : Response) : Promise<Task[]> {
        return await this.taskService.getAll();
    }

    @Post()
    async create(@Body() task: TaskDto, @Req() req : Request, @Res({passthrough : true}) res : Response) {
        console.log(task);
        return await this.taskService.create(task, jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
    }

    @Get(['complete/:taskID', 'complete'])
    async complete(@Req() req : Request, @Param('taskID') taskID : string) : Promise<Task> {
        if(taskID) return await this.taskService.changeTaskCompletion(taskID, jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
        return await this.taskService.changeTaskCompletion(req.cookies.taskid, jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
    }

    @Get('me')
    async getUserTask(@Req() req : Request) : Promise<Task[]> {
        return await this.taskService.getUserTask(jwt.verify(req.cookies.id, secret.jwtsecret)['id']);
    }

    @Get('date/:date')
    async getTasksToday(@Param('date') date : Date ,  @Req() req : Request) {
        return await this.taskService.getTaskToday(jwt.verify(req.cookies.id, secret.jwtsecret)['id'], parser.parseDate(date));
    }

    @Delete()
    async deleteTask(@Body() id : TaskDto) : Promise<Task> {
        return await this.taskService.deleteTask(id._id);
    }
}
