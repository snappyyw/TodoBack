import { ListService } from "./list.service";
import { CreateListDto } from "./dto/createList.dto";
import { GetListDto } from "./dto/getList.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { EditListDto } from "./dto/editList.dto";
import { DeleteListDto } from "./dto/deleteList.dto";
export declare class ListController {
    private listService;
    constructor(listService: ListService);
    createBoard(createListDto: CreateListDto): Promise<{
        message: string;
    }>;
    deleteBoard(deleteListDto: DeleteListDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    editBoard(editBoardDto: EditListDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getBoard(getListDto: GetListDto, request: AuthenticatedRequest): Promise<import("./list.model").List[]>;
}
