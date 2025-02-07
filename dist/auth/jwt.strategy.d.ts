import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: User): Promise<{
        id: string;
        email: string;
    }>;
}
export {};
