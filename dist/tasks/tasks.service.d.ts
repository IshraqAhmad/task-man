import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTasksByFilters(filterDto: GetTaskFilterDto): Task[];
    getTaskById(id: string): Task;
    deleteTask(id: string): void;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
}
