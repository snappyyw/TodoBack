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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const task_service_1 = require("./task.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const createTask_dto_1 = require("./dto/createTask.dto");
const task_dto_1 = require("./dto/task.dto");
const getTask_dto_1 = require("./dto/getTask.dto");
const editTask_dto_1 = require("./dto/editTask.dto");
const deleteTask_dto_1 = require("./dto/deleteTask.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }
    getBoard(getTaskDto, request) {
        return this.taskService.getAllTask({
            ...getTaskDto,
            userId: request.user.id,
        });
    }
    editBoard(editTaskDto, request) {
        try {
            return this.taskService.editTask({
                ...editTaskDto,
                userId: request.user.id,
            });
        }
        catch (error) {
            throw error;
        }
    }
    deleteBoard(deleteTaskDto, request) {
        try {
            return this.taskService.deleteTask({
                ...deleteTaskDto,
                userId: request?.user?.id,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание задачи' }),
    (0, swagger_1.ApiResponse)({ status: 201, example: { message: 'Задача успешно создан' } }),
    (0, common_1.Post)('/createTask'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTask_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение задач' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [task_dto_1.TaskDto] }),
    (0, common_1.Get)('/task'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTask_dto_1.GetTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение задачи' }),
    (0, swagger_1.ApiResponse)({ status: 200, example: { message: 'Задача успешно изменена' } }),
    (0, common_1.Put)('/editTask'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editTask_dto_1.EditTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "editBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление задачи' }),
    (0, swagger_1.ApiResponse)({ status: 200, example: { message: 'Задача успешно удалена' } }),
    (0, common_1.Delete)('/deleteTask'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteTask_dto_1.DeleteTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "deleteBoard", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, swagger_1.ApiTags)('Задачи'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map