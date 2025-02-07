import { Model } from "sequelize-typescript";
import { Board } from "../board/board.model";
interface BoardCreationAttrs {
    name: string;
}
export declare class List extends Model<List, BoardCreationAttrs> {
    id: string;
    name: string;
    boardId: string;
    board: Board;
}
export {};
