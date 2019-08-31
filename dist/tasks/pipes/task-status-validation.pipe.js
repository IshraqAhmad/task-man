"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const task_model_1 = require("../task.model");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            task_model_1.TaskStatus.OPEN,
            task_model_1.TaskStatus.IN_PROGRESS,
            task_model_1.TaskStatus.DONE
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`${value} is invalid status.`);
        }
        return value;
    }
    isStatusValid(status) {
        const returnValue = this.allowedStatuses.indexOf(status);
        return returnValue !== -1;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map