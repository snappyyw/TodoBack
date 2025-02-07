import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { TaskService } from "./task.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateTaskDto } from "./dto/createTask.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { TaskDto } from "./dto/task.dto";
import { GetTaskDto } from "./dto/getTask.dto";
import { EditTaskDto } from "./dto/editTask.dto";
import { DeleteTaskDto } from "./dto/deleteTask.dto";

@Controller('task')
@ApiTags('Задачи')
@ApiBearerAuth('JWT-auth')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @ApiOperation({summary: 'Создание задачи'})
  @ApiResponse({status: 201, example: { message: 'Задача успешно создан' }})
  @Post('/createTask')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
  )
  {
    return this.taskService.createTask(createTaskDto)
  }

  @ApiOperation({summary: 'Получение задач'})
  @ApiResponse({status: 200, type: [TaskDto]})
  @Get('/task')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getBoard(
    @Query() getTaskDto: GetTaskDto,
    @Req() request: AuthenticatedRequest
  ){
    return this.taskService.getAllTask({
      ...getTaskDto,
      userId: request.user.id,
    })
  }

  @ApiOperation({summary: 'Изменение задачи'})
  @ApiResponse({status: 200, example: { message: 'Задача успешно изменена' }})
  @Put('/editTask')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  editBoard(
    @Body() editTaskDto: EditTaskDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.taskService.editTask({
        ...editTaskDto,
        userId: request.user.id,
      })
    } catch (error){
      throw error;
    }
  }

  @ApiOperation({summary: 'Удаление задачи'})
  @ApiResponse({status: 200, example: { message: 'Задача успешно удалена' }})
  @Delete('/deleteTask')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteBoard(
    @Query() deleteTaskDto: DeleteTaskDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.taskService.deleteTask({
        ...deleteTaskDto,
        userId: request?.user?.id,
      })
    } catch (error){
      throw error;
    }
  }
}
