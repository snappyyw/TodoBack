import { UsersService } from "./users.service";
import { RegistrationDto } from "../auth/dto/registration.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(registrationDto: RegistrationDto): Promise<import("./users.model").User>;
}
