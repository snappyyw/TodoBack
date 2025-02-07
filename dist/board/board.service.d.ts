import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { EditBoardDto } from "./dto/editBoard.dto";
import { DeleteBoardDto } from "./dto/deleteBoard.dto";
export declare class BoardService {
    private boardRepository;
    constructor(boardRepository: typeof Board);
    getBoard(boardId: string): Promise<Board>;
    getAllBoard(userId: string): Promise<Board[]>;
    deleteBoard(deleteBoardDto: DeleteBoardDto): Promise<{
        message: string;
    }>;
    editBoard(editBoardDto: EditBoardDto): Promise<{
        message: string;
    }>;
    createBoard(createBoardDto: CreateBoardDto): Promise<{
        message: string;
    }>;
}
