import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    registration(userDto: RegistrationDto): Promise<{
        token: string;
    }>;
}
