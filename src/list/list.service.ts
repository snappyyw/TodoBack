import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { List } from "./list.model";
import { GetListDto } from "./dto/getList.dto";
import { CreateListDto } from "./dto/createList.dto";
import { WhereOptions } from "sequelize";
import { EditListDto } from "./dto/editList.dto";
import { BoardService } from "../board/board.service";
import { DeleteListDto } from "./dto/deleteList.dto";

@Injectable()
export class ListService {

  constructor(@InjectModel(List) private listRepository: typeof List, private boardService: BoardService) {
  }

  async getList(listId: string){
    return await this.listRepository.findOne({
      where: {
        id: listId
      } as WhereOptions<List>
    })
  }

  async deleteList(deleteListDto: DeleteListDto){
    try {
      const board = await this.boardService.getBoard(deleteListDto.boardId)

      if(board.userId !== deleteListDto.userId){
        throw new NotFoundException('Нет прав на удаление листа');
      }

      const currentList = await this.getList(deleteListDto.listId)

      if(currentList.boardId !== board.id){
        throw new NotFoundException('Нет прав на удаление листа');
      }

      await currentList.destroy();

      return { message: 'Доска успешно удалена' };
    } catch (error){
      throw error
    }
  }

  async getAllList(getListDto: GetListDto){
    const board = await this.boardService.getBoard(getListDto.boardId)

    if(board.userId !== getListDto.userId){
      throw new NotFoundException('Нет прав на получение листа');
    }

    return await this.listRepository.findAll({
      attributes: ['id', 'name'],
      where: {
        boardId: getListDto.boardId,
      }
    })
  }

  async createList(createListDto: CreateListDto){
    await this.listRepository.create(createListDto);
    return { message: 'Лист успешно создан' };
  }

  async editList (editListDto: EditListDto) {
    try {
      const board = await this.boardService.getBoard(editListDto.boardId)

      if (!board) {
        throw new NotFoundException('Борд не найден');
      }

      if(board.userId !== editListDto.userId){
        throw new NotFoundException('Нет прав для изменения листа');
      }

      const currentList = await this.getList(editListDto.listId)

      if (!currentList) {
        throw new NotFoundException('Лист не найден');
      }

      if(currentList.boardId !== board.id){
        throw new NotFoundException('Нет прав для изменения листа');
      }

      const [affectedCount] = await this.listRepository.update(
        {
          name: editListDto.name,
        },
        {
          where: {
            id: editListDto.listId,
          },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        throw new Error('Не удалось обновить лист');
      }

      return { message: 'Лист успешно изменен' };
    } catch (error) {
      throw error;
    }
  }

}
