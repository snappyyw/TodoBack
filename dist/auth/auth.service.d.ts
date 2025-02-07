import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    registration(registrationDto: RegistrationDto): Promise<{
        token: string;
    }>;
    private generateToken;
}
