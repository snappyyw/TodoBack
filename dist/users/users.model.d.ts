import { Model } from "sequelize-typescript";
import { Board } from "../board/board.model";
interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: string;
    email: string;
    password: string;
    name: string;
    board: Board[];
}
export {};
