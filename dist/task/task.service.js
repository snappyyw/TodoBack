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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const task_model_1 = require("./task.model");
const board_service_1 = require("../board/board.service");
const list_service_1 = require("../list/list.service");
let TaskService = class TaskService {
    constructor(taskRepository, boardService, listService) {
        this.taskRepository = taskRepository;
        this.boardService = boardService;
        this.listService = listService;
    }
    async getTask(taskId) {
        return await this.taskRepository.findOne({
            where: {
                id: taskId,
            }
        });
    }
    async editTask(editTaskDto) {
        try {
            const board = await this.boardService.getBoard(editTaskDto.boardId);
            if (!board) {
                throw new common_1.NotFoundException('Борд не найден');
            }
            if (board.userId !== editTaskDto.userId) {
                throw new common_1.NotFoundException('Нет прав для изменения задачи');
            }
            const list = await this.listService.getList(editTaskDto.listId);
            if (!list) {
                throw new common_1.NotFoundException('Лист не найден');
            }
            if (list.boardId !== board.id) {
                throw new common_1.NotFoundException('Нет прав для изменения задачи');
            }
            const currentTask = await this.getTask(editTaskDto.taskId);
            if (!currentTask) {
                throw new common_1.NotFoundException('Задача не найдена');
            }
            if (currentTask.listId !== list.id) {
                throw new common_1.NotFoundException('Нет прав для изменения задачи');
            }
            const [affectedCount] = await this.taskRepository.update({
                name: editTaskDto.name,
                isActive: editTaskDto.isActive
            }, {
                where: {
                    id: editTaskDto.taskId,
                },
                returning: true,
            });
            if (affectedCount === 0) {
                throw new Error('Не удалось обновить задачу');
            }
            return { message: 'Задача успешно изменена' };
        }
        catch (error) {
            throw error;
        }
    }
    async createTask(createTaskDto) {
        await this.taskRepository.create({
            name: createTaskDto.name,
            listId: createTaskDto.listId,
            isActive: true,
        });
        return { message: 'Задача успешно создана' };
    }
    async getAllTask(getTaskDto) {
        const board = await this.boardService.getBoard(getTaskDto.boardId);
        if (board.userId !== getTaskDto.userId) {
            throw new common_1.NotFoundException('Нет прав на получение задач');
        }
        const list = await this.listService.getList(getTaskDto.listId);
        if (list.boardId !== board.id) {
            throw new common_1.NotFoundException('Нет прав на получение задач');
        }
        return await this.taskRepository.findAll({
            attributes: ['id', 'name', 'isActive'],
            where: {
                listId: getTaskDto.listId,
            }
        });
    }
    async deleteTask(deleteTaskDto) {
        try {
            const board = await this.boardService.getBoard(deleteTaskDto.boardId);
            if (board.userId !== deleteTaskDto.userId) {
                throw new common_1.NotFoundException('Нет прав на удаление задачи');
            }
            const list = await this.listService.getList(deleteTaskDto.listId);
            if (list.boardId !== board.id) {
                throw new common_1.NotFoundException('Нет прав на удаление задачи');
            }
            const currentTask = await this.getTask(deleteTaskDto.taskId);
            if (currentTask.listId !== list.id) {
                throw new common_1.NotFoundException('Нет прав на удаление задачи');
            }
            await currentTask.destroy();
            return { message: 'Задача успешно удалена' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(task_model_1.Task)),
    __metadata("design:paramtypes", [Object, board_service_1.BoardService,
        list_service_1.ListService])
], TaskService);
//# sourceMappingURL=task.service.js.map