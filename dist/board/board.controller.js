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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const board_service_1 = require("./board.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const createBoard_dto_1 = require("./dto/createBoard.dto");
const board_dto_1 = require("./dto/board.dto");
const editBoard_dto_1 = require("./dto/editBoard.dto");
const deleteBoard_dto_1 = require("./dto/deleteBoard.dto");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    createBoard(createBoardDto, request) {
        return this.boardService.createBoard({
            ...createBoardDto,
            userId: request?.user?.id,
        });
    }
    deleteBoard(deleteBoardDto, request) {
        try {
            return this.boardService.deleteBoard({
                ...deleteBoardDto,
                userId: request?.user?.id,
            });
        }
        catch (error) {
            throw error;
        }
    }
    editBoard(createBoardDto, request) {
        try {
            return this.boardService.editBoard({
                ...createBoardDto,
                userId: request?.user?.id,
            });
        }
        catch (error) {
            throw error;
        }
    }
    getBoard(request) {
        return this.boardService.getAllBoard(request?.user?.id);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание доски' }),
    (0, swagger_1.ApiResponse)({ status: 201, example: { message: 'Доска успешно создана' } }),
    (0, common_1.Post)('/createBoard'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBoard_dto_1.CreateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "createBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление доски' }),
    (0, swagger_1.ApiResponse)({ status: 204, example: { message: 'Доска успешно удалена' } }),
    (0, common_1.Delete)('/deleteBoard'),
    (0, common_1.HttpCode)(204),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteBoard_dto_1.DeleteBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "deleteBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение доски' }),
    (0, swagger_1.ApiResponse)({ status: 200, example: { message: 'Доска успешно изменена' } }),
    (0, common_1.Put)('/editBoard'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editBoard_dto_1.EditBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "editBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение досок' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [board_dto_1.BoardDto] }),
    (0, common_1.Get)('/boards'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getBoard", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.Controller)('board'),
    (0, swagger_1.ApiTags)('Доска'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map