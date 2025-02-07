"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const jwt_config_1 = require("./config/jwt.config");
const users_module_1 = require("./users/users.module");
const users_model_1 = require("./users/users.model");
const auth_module_1 = require("./auth/auth.module");
const board_module_1 = require("./board/board.module");
const board_model_1 = require("./board/board.model");
const list_module_1 = require("./list/list.module");
const list_model_1 = require("./list/list.model");
const task_module_1 = require("./task/task.module");
const task_model_1 = require("./task/task.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                load: [jwt_config_1.default],
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, board_model_1.Board, list_model_1.List, task_model_1.Task],
                autoLoadModels: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            board_module_1.BoardModule,
            list_module_1.ListModule,
            task_module_1.TaskModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map