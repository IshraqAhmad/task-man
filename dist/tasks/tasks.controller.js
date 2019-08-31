"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_model_1 = require("./task.model");
const create_task_dto_1 = require("./dto/create-task.dto");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
let TasksController = class TasksController {
    constructor(taskservice) {
        this.taskservice = taskservice;
    }
    getTasks(filterDto) {
        if (Object.keys(filterDto).length > 0) {
            return this.taskservice.getTasksByFilters(filterDto);
        }
        else {
            return this.taskservice.getAllTasks();
        }
    }
    deleteTask(id) {
        this.taskservice.deleteTask(id);
    }
    getTaskById(id) {
        return this.taskservice.getTaskById(id);
    }
    createTask(createTaskDto) {
        return this.taskservice.createTask(createTaskDto);
    }
    updateTaskSTatus(id, status) {
        return this.taskservice.updateTaskStatus(id, status);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.GetTaskFilterDto]),
    __metadata("design:returntype", Array)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteTask", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTaskById", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Object)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Patch('/:id/status'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('status', task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateTaskSTatus", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map