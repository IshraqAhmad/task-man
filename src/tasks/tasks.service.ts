import { Injectable, NotFoundException, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository)
    private taskrepository: TaskRepository ) {

    }

    async getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]> {
        return this.taskrepository.getTasks(filterDto);
    }
    
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskrepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
        return found;
    }

    async deleteTask(id: number) : Promise<void> {
        const result = await this.taskrepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
        ): Promise<Task> {
        return this.taskrepository.createTask(createTaskDto, user);
    }

    async updateTaskStatus(id: number, status: TaskStatus) : Promise<Task> {
        var task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

}
