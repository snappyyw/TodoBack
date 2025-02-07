import { List } from "./list.model";
import { GetListDto } from "./dto/getList.dto";
import { CreateListDto } from "./dto/createList.dto";
import { EditListDto } from "./dto/editList.dto";
export declare class ListService {
    private listRepository;
    constructor(listRepository: typeof List);
    getAllList(getListDto: GetListDto): Promise<List[]>;
    createList(createListDto: CreateListDto): Promise<{
        message: string;
    }>;
    editList(editListDto: EditListDto): Promise<{
        message: string;
    }>;
}
