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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const board_model_1 = require("./board.model");
let BoardService = class BoardService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async getAllBoard(userId) {
        return await this.boardRepository.findAll({
            attributes: ['id', 'name'],
            where: {
                userId,
            }
        });
    }
    async deleteBoard(deleteBoardDto) {
        try {
            const board = await this.boardRepository.findOne({
                where: { id: deleteBoardDto.boardId }
            });
            if (!board) {
                throw new common_1.NotFoundException('Доска не найдена');
            }
            if (board.userId !== deleteBoardDto.userId) {
                throw new common_1.ForbiddenException('Нет прав для изменения доски');
            }
            await board.destroy();
            return { message: 'Доска успешно удалена' };
        }
        catch (error) {
            throw error;
        }
    }
    async editBoard(editBoardDto) {
        try {
            const board = await this.boardRepository.findOne({
                where: { id: editBoardDto.boardId }
            });
            if (!board) {
                throw new common_1.NotFoundException('Доска не найдена');
            }
            if (board.userId !== editBoardDto.userId) {
                throw new common_1.ForbiddenException('Нет прав для изменения доски');
            }
            const [affectedCount] = await this.boardRepository.update({
                name: editBoardDto.name,
            }, {
                where: {
                    id: editBoardDto.boardId,
                    userId: editBoardDto.userId,
                },
                returning: true,
            });
            if (affectedCount === 0) {
                throw new Error('Не удалось обновить доску');
            }
            return { message: 'Доска успешно изменена' };
        }
        catch (error) {
            throw error;
        }
    }
    async createBoard(createBoardDto) {
        await this.boardRepository.create(createBoardDto);
        return { message: 'Доска успешно создана' };
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(board_model_1.Board)),
    __metadata("design:paramtypes", [Object])
], BoardService);
//# sourceMappingURL=board.service.js.map