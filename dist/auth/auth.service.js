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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const helpPassword_1 = require("./lib/helpPassword");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email);
        if (!user) {
            throw new common_1.HttpException('Неверный email или пароль', common_1.HttpStatus.UNAUTHORIZED);
        }
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (passwordEquals) {
            return this.generateToken(user);
        }
        else {
            throw new common_1.HttpException('Неверный email или пароль', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async registration(registrationDto) {
        const userDb = await this.userService.getUserByEmail(registrationDto.email);
        if (userDb) {
            throw new common_1.HttpException('Email уже занят', common_1.HttpStatus.CONFLICT);
        }
        const errorValidPassword = (0, helpPassword_1.validatePassword)(registrationDto.password);
        if (errorValidPassword) {
            throw new common_1.HttpException(errorValidPassword, common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(registrationDto.password, 10);
        const user = await this.userService.createUser({ ...registrationDto, password: hashPassword });
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map