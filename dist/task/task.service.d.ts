import { Task } from "./task.model";
import { BoardService } from "../board/board.service";
import { ListService } from "../list/list.service";
import { DeleteTaskDto } from "./dto/deleteTask.dto";
import { GetTaskDto } from "./dto/getTask.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { EditTaskDto } from "./dto/editTask.dto";
export declare class TaskService {
    private taskRepository;
    private boardService;
    private listService;
    constructor(taskRepository: typeof Task, boardService: BoardService, listService: ListService);
    getTask(taskId: string): Promise<Task>;
    editTask(editTaskDto: EditTaskDto): Promise<{
        message: string;
    }>;
    createTask(createTaskDto: CreateTaskDto): Promise<{
        message: string;
    }>;
    getAllTask(getTaskDto: GetTaskDto): Promise<Task[]>;
    deleteTask(deleteTaskDto: DeleteTaskDto): Promise<{
        message: string;
    }>;
}
