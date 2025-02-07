import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
import { List } from "../list/list.model";
interface BoardCreationAttrs {
    name: string;
}
export declare class Board extends Model<Board, BoardCreationAttrs> {
    id: string;
    name: string;
    userId: string;
    author: User;
    list: List[];
}
export {};
