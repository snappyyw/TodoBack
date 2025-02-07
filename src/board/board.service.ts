import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { EditBoardDto } from "./dto/editBoard.dto";
import { WhereOptions } from "sequelize";
import { DeleteBoardDto } from "./dto/deleteBoard.dto";

@Injectable()
export class BoardService {

  constructor(@InjectModel(Board) private boardRepository: typeof Board) {
  }

  async getAllBoard(userId: string){
    return await this.boardRepository.findAll({
      attributes: ['id', 'name'],
      where: {
        userId,
      }
    })
  }

  async deleteBoard (deleteBoardDto: DeleteBoardDto){
    try {
      const board = await this.boardRepository.findOne({
        where: { id: deleteBoardDto.boardId } as WhereOptions<Board>
      });

      if (!board) {
        throw new NotFoundException('Доска не найдена');
      }

      if (board.userId !== deleteBoardDto.userId) {
        throw new ForbiddenException('Нет прав для изменения доски');
      }

      await board.destroy()

      return { message: 'Доска успешно удалена' };
    } catch (error) {
      throw error;
    }
  }

  async editBoard (editBoardDto: EditBoardDto) {
    try {
      const board = await this.boardRepository.findOne({
        where: { id: editBoardDto.boardId } as WhereOptions<Board>
      });

      if (!board) {
        throw new NotFoundException('Доска не найдена');
      }

      if (board.userId !== editBoardDto.userId) {
        throw new ForbiddenException('Нет прав для изменения доски');
      }

      const [affectedCount] = await this.boardRepository.update(
        {
          name: editBoardDto.name,
        },
        {
          where: {
            id: editBoardDto.boardId,
            userId: editBoardDto.userId,
          },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        throw new Error('Не удалось обновить доску');
      }

      return { message: 'Доска успешно изменена' };
    } catch (error) {
      throw error;
    }
  }

  async createBoard(createBoardDto: CreateBoardDto){
    await this.boardRepository.create(createBoardDto);
    return { message: 'Доска успешно создана' };
  }
}
