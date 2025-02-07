import { Model } from "sequelize-typescript";
import { List } from "../list/list.model";
interface TaskCreationAttrs {
    name: string;
    isActive: string;
    listId: string;
}
export declare class Task extends Model<Task, TaskCreationAttrs> {
    id: string;
    name: string;
    isActive: boolean;
    listId: string;
    list: List;
}
export {};
