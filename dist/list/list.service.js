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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const list_model_1 = require("./list.model");
const board_service_1 = require("../board/board.service");
let ListService = class ListService {
    constructor(listRepository, boardService) {
        this.listRepository = listRepository;
        this.boardService = boardService;
    }
    async getList(listId) {
        return await this.listRepository.findOne({
            where: {
                id: listId
            }
        });
    }
    async deleteList(deleteListDto) {
        try {
            const board = await this.boardService.getBoard(deleteListDto.boardId);
            if (board.userId !== deleteListDto.userId) {
                throw new common_1.NotFoundException('Нет прав на удаление листа');
            }
            const currentList = await this.getList(deleteListDto.listId);
            if (currentList.boardId !== board.id) {
                throw new common_1.NotFoundException('Нет прав на удаление листа');
            }
            await currentList.destroy();
            return { message: 'Доска успешно удалена' };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllList(getListDto) {
        const board = await this.boardService.getBoard(getListDto.boardId);
        if (board.userId !== getListDto.userId) {
            throw new common_1.NotFoundException('Нет прав на получение листа');
        }
        return await this.listRepository.findAll({
            attributes: ['id', 'name'],
            where: {
                boardId: getListDto.boardId,
            }
        });
    }
    async createList(createListDto) {
        await this.listRepository.create(createListDto);
        return { message: 'Лист успешно создан' };
    }
    async editList(editListDto) {
        try {
            const board = await this.boardService.getBoard(editListDto.boardId);
            if (!board) {
                throw new common_1.NotFoundException('Борд не найден');
            }
            if (board.userId !== editListDto.userId) {
                throw new common_1.NotFoundException('Нет прав для изменения листа');
            }
            const currentList = await this.getList(editListDto.listId);
            if (!currentList) {
                throw new common_1.NotFoundException('Лист не найден');
            }
            if (currentList.boardId !== board.id) {
                throw new common_1.NotFoundException('Нет прав для изменения листа');
            }
            const [affectedCount] = await this.listRepository.update({
                name: editListDto.name,
            }, {
                where: {
                    id: editListDto.listId,
                },
                returning: true,
            });
            if (affectedCount === 0) {
                throw new Error('Не удалось обновить лист');
            }
            return { message: 'Лист успешно изменен' };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(list_model_1.List)),
    __metadata("design:paramtypes", [Object, board_service_1.BoardService])
], ListService);
//# sourceMappingURL=list.service.js.map