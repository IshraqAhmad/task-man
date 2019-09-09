import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { exec } from 'child_process';

const mockUser = { id: 12, username: 'Test user' };

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn()
});

describe('TaskService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TaskRepository, useFactory: mockTasksRepository }
            ]
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('Get all tasks', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTaskFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' }
            var result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    })

    describe('getTaskById', () => {
        it('Calls tasksRepository.findOne() and returns task', async () => {
            const mockTask = { title: 'Test', description: 'Dummy test' };
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: { id: 1, userId: mockUser.id }
            });
        });

        it('Throws error if task is not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow();
        });
    })

    describe('createTask', () => {
        it('Calls taskRepository.create() and returns results', async () => {

            //taskRepository.createTask.mockResolvedValue('someTask');
            const mockTask = { title: 'Test', description: 'Dummy test' };

            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const result = tasksService.createTask(mockTask, mockUser);
            expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser);

            //expect(result).toEqual('someTask');
        })
    })
});
