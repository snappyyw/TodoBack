import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { EditBoardDto } from "./dto/editBoard.dto";
import { DeleteBoardDto } from "./dto/deleteBoard.dto";
export declare class BoardController {
    private boardService;
    constructor(boardService: BoardService);
    createBoard(createBoardDto: CreateBoardDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    deleteBoard(deleteBoardDto: DeleteBoardDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    editBoard(createBoardDto: EditBoardDto, request: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getBoard(request: AuthenticatedRequest): Promise<import("./board.model").Board[]>;
}
