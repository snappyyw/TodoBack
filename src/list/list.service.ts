import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { List } from "./list.model";
import { GetListDto } from "./dto/getList.dto";
import { CreateListDto } from "./dto/createList.dto";
import { WhereOptions } from "sequelize";
import { EditListDto } from "./dto/editList.dto";

@Injectable()
export class ListService {

  constructor(@InjectModel(List) private listRepository: typeof List) {
  }

  async getAllList(getListDto: GetListDto){
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
      const list = await this.listRepository.findOne({
        where: { id: editListDto.listId } as WhereOptions<List>
      });

      if (!list) {
        throw new NotFoundException('Лист не найден');
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
