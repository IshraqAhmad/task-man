import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
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
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task>  {
        return this.taskservice.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskSTatus(
        @Param('id', ParseIntPipe) id: number ,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task> {

        return this.taskservice.updateTaskStatus(id, status);
    }
}
