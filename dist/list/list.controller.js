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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const list_service_1 = require("./list.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const createList_dto_1 = require("./dto/createList.dto");
const list_dto_1 = require("./dto/list.dto");
const getList_dto_1 = require("./dto/getList.dto");
const editList_dto_1 = require("./dto/editList.dto");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    createBoard(createListDto) {
        return this.listService.createList(createListDto);
    }
    editBoard(editBoardDto, request) {
        try {
            return this.listService.editList(editBoardDto);
        }
        catch (error) {
            throw error;
        }
    }
    getBoard(getListDto) {
        return this.listService.getAllList(getListDto);
    }
};
exports.ListController = ListController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание листа' }),
    (0, swagger_1.ApiResponse)({ status: 201, example: { message: 'Лист успешно создан' } }),
    (0, common_1.Post)('/createList'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createList_dto_1.CreateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "createBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение листа' }),
    (0, swagger_1.ApiResponse)({ status: 200, example: { message: 'Лист успешно изменен' } }),
    (0, common_1.Put)('/editList'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editList_dto_1.EditListDto, Object]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "editBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение листов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [list_dto_1.ListDto] }),
    (0, common_1.Get)('/list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getList_dto_1.GetListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "getBoard", null);
exports.ListController = ListController = __decorate([
    (0, common_1.Controller)('list'),
    (0, swagger_1.ApiTags)('Лист'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map