import { List } from "./list.model";
import { GetListDto } from "./dto/getList.dto";
import { CreateListDto } from "./dto/createList.dto";
import { EditListDto } from "./dto/editList.dto";
import { BoardService } from "../board/board.service";
import { DeleteListDto } from "./dto/deleteList.dto";
export declare class ListService {
    private listRepository;
    private boardService;
    constructor(listRepository: typeof List, boardService: BoardService);
    getList(listId: string): Promise<List>;
    deleteList(deleteListDto: DeleteListDto): Promise<{
        message: string;
    }>;
    getAllList(getListDto: GetListDto): Promise<List[]>;
    createList(createListDto: CreateListDto): Promise<{
        message: string;
    }>;
    editList(editListDto: EditListDto): Promise<{
        message: string;
    }>;
}
