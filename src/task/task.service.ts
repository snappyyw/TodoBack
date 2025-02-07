import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Task } from "./task.model";
import { BoardService } from "../board/board.service";
import { ListService } from "../list/list.service";
import { WhereOptions } from "sequelize";
import { DeleteTaskDto } from "./dto/deleteTask.dto";
import { GetTaskDto } from "./dto/getTask.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { EditTaskDto } from "./dto/editTask.dto";

@Injectable()
export class TaskService {

  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private boardService: BoardService,
    private listService: ListService) {
  }

  async getTask(taskId: string){
    return await this.taskRepository.findOne({
      where: {
        id: taskId,
      } as WhereOptions<Task>
    })
  }

  async editTask (editTaskDto: EditTaskDto) {
    try {
      const board = await this.boardService.getBoard(editTaskDto.boardId)

      if (!board) {
        throw new NotFoundException('Борд не найден');
      }

      if(board.userId !== editTaskDto.userId){
        throw new NotFoundException('Нет прав для изменения задачи');
      }

      const list = await this.listService.getList(editTaskDto.listId)

      if (!list) {
        throw new NotFoundException('Лист не найден');
      }

      if(list.boardId !== board.id){
        throw new NotFoundException('Нет прав для изменения задачи');
      }

      const currentTask = await this.getTask(editTaskDto.taskId)

      if (!currentTask) {
        throw new NotFoundException('Задача не найдена');
      }

      if(currentTask.listId !== list.id){
        throw new NotFoundException('Нет прав для изменения задачи');
      }

      const [affectedCount] = await this.taskRepository.update(
        {
          name: editTaskDto.name,
          isActive: editTaskDto.isActive
        },
        {
          where: {
            id: editTaskDto.taskId,
          },
          returning: true,
        }
      );

      if (affectedCount === 0) {
        throw new Error('Не удалось обновить задачу');
      }

      return { message: 'Задача успешно изменена' };
    } catch (error) {
      throw error;
    }
  }

  async createTask(createTaskDto: CreateTaskDto){
    await this.taskRepository.create({
      name: createTaskDto.name,
      listId: createTaskDto.listId,
      isActive: true,
    } as any);
    return { message: 'Задача успешно создана' };
  }

  async getAllTask(getTaskDto: GetTaskDto){
    const board = await this.boardService.getBoard(getTaskDto.boardId)

    if(board.userId !== getTaskDto.userId){
      throw new NotFoundException('Нет прав на получение задач');
    }

    const list = await this.listService.getList(getTaskDto.listId)

    if(list.boardId !== board.id){
      throw new NotFoundException('Нет прав на получение задач');
    }

    return await this.taskRepository.findAll({
      attributes: ['id', 'name', 'isActive'],
      where: {
        listId: getTaskDto.listId,
      }
    })
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto){
    try {
      const board = await this.boardService.getBoard(deleteTaskDto.boardId)

      if(board.userId !== deleteTaskDto.userId){
        throw new NotFoundException('Нет прав на удаление задачи');
      }

      const list = await this.listService.getList(deleteTaskDto.listId)

      if(list.boardId !== board.id){
        throw new NotFoundException('Нет прав на удаление задачи');
      }

      const currentTask = await this.getTask(deleteTaskDto.taskId)

      if(currentTask.listId !== list.id){
        throw new NotFoundException('Нет прав на удаление задачи');
      }

      await currentTask.destroy();

      return { message: 'Задача успешно удалена' };

    } catch (error){
      throw error
    }
  }

}
