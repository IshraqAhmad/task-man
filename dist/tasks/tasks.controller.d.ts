import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksController {
    private taskservice;
    constructor(taskservice: TasksService);
    getTasks(filterDto: GetTaskFilterDto): Task[];
    deleteTask(id: string): void;
    getTaskById(id: string): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTaskSTatus(id: string, status: TaskStatus): Task;
}
