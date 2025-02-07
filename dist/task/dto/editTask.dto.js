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
exports.EditTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EditTaskDto {
}
exports.EditTaskDto = EditTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'List', description: 'Новое наименование задачи' }),
    (0, class_validator_1.IsDefined)({ message: 'Обязательнеый параметр' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Параметр не должен содежать более 50 символова' }),
    (0, class_validator_1.IsString)({ message: 'Должен быть строкой' }),
    __metadata("design:type", String)
], EditTaskDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Новой статус задачи' }),
    (0, class_validator_1.IsDefined)({ message: 'Обязательнеый параметр' }),
    (0, class_validator_1.IsBoolean)({ message: 'Должен быть boolean' }),
    __metadata("design:type", Boolean)
], EditTaskDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: 'Некорректный формат ID' }),
    (0, swagger_1.ApiProperty)({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id задачи' }),
    (0, class_validator_1.IsDefined)({ message: 'Обязательнеый параметр' }),
    __metadata("design:type", String)
], EditTaskDto.prototype, "taskId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: 'Некорректный формат ID' }),
    (0, swagger_1.ApiProperty)({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id листа' }),
    (0, class_validator_1.IsDefined)({ message: 'Обязательнеый параметр' }),
    __metadata("design:type", String)
], EditTaskDto.prototype, "listId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: 'Некорректный формат ID' }),
    (0, swagger_1.ApiProperty)({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id борда' }),
    (0, class_validator_1.IsDefined)({ message: 'Обязательнеый параметр' }),
    __metadata("design:type", String)
], EditTaskDto.prototype, "boardId", void 0);
//# sourceMappingURL=editTask.dto.js.map