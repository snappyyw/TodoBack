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
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const board_model_1 = require("../board/board.model");
let List = class List extends sequelize_typescript_1.Model {
};
exports.List = List;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], List.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New list', description: 'Наименование листа' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], List.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => board_model_1.Board),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], List.prototype, "boardId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => board_model_1.Board),
    __metadata("design:type", board_model_1.Board)
], List.prototype, "board", void 0);
exports.List = List = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'list' })
], List);
//# sourceMappingURL=list.model.js.map