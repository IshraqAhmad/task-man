import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) {

    }

    //@Get()
    //getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //    if (Object.keys(filterDto).length > 0) {
    //        return this.taskservice.getTasksByFilters(filterDto);
    //    }
    //    else {
    //        return this.taskservice.getAllTasks();
    //    }
    //}

    //@Delete('/:id')
    //deleteTask(@Param('id') id: string) {
    //    this.taskservice.deleteTask(id);
    //}

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
        return this.taskservice.getTaskById(id);
    }

    //@Post()
    //@UsePipes(ValidationPipe)
    //createTask(@Body() createTaskDto: CreateTaskDto) : Task  {
    //    return this.taskservice.createTask(createTaskDto);
    //}

    //@Patch('/:id/status')
    //updateTaskSTatus(
    //    @Param('id') id: string,
    //    @Body('status', TaskStatusValidationPipe) status: TaskStatus) {

    //    return this.taskservice.updateTaskStatus(id, status);
    //}
}
