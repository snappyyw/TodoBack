"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const list_controller_1 = require("./list.controller");
const list_service_1 = require("./list.service");
const board_model_1 = require("../board/board.model");
const list_model_1 = require("./list.model");
let ListModule = class ListModule {
};
exports.ListModule = ListModule;
exports.ListModule = ListModule = __decorate([
    (0, common_1.Module)({
        controllers: [list_controller_1.ListController],
        providers: [list_service_1.ListService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([board_model_1.Board, list_model_1.List])
        ]
    })
], ListModule);
//# sourceMappingURL=list.module.js.map