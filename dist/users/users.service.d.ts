import { User } from "./users.model";
import { RegistrationDto } from "../auth/dto/registration.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(registrationDto: RegistrationDto): Promise<User>;
    findUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}
