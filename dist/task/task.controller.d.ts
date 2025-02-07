import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { GetTaskDto } from "./dto/getTask.dto";
import { EditTaskDto } from "./dto/editTask.dto";
import { DeleteTaskDto } from "./dto/deleteTask.dto";
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<{
        message: string;
    }>;
    getBoard(getTaskDto: GetTaskDto, request: AuthenticatedRequest): Promise<import("./task.model").Task[]>;
    editBoard(editTaskDto: EditTaskDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    deleteBoard(deleteTaskDto: DeleteTaskDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
}
