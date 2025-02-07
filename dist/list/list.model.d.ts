import { Model } from "sequelize-typescript";
import { Board } from "../board/board.model";
import { Task } from "../task/task.model";
interface BoardCreationAttrs {
    name: string;
}
export declare class List extends Model<List, BoardCreationAttrs> {
    id: string;
    name: string;
    boardId: string;
    board: Board;
    task: Task[];
}
export {};
