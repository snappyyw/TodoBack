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
exports.Board = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const users_model_1 = require("../users/users.model");
const list_model_1 = require("../list/list.model");
let Board = class Board extends sequelize_typescript_1.Model {
};
exports.Board = Board;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New board', description: 'Наименование борда' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Board.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Board.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => list_model_1.List),
    __metadata("design:type", Array)
], Board.prototype, "list", void 0);
exports.Board = Board = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'board' })
], Board);
//# sourceMappingURL=board.model.js.map