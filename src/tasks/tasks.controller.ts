import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) {

    }

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Promise<Task[]> {
        return this.taskservice.getTasks(filterDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number) : Promise<void> {
        return this.taskservice.deleteTask(id);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskservice.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task>  {
        return this.taskservice.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskSTatus(
        @Param('id', ParseIntPipe) id: number ,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task> {

        return this.taskservice.updateTaskStatus(id, status);
    }
}
