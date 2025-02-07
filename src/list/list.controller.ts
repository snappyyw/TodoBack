import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ListService } from "./list.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateListDto } from "./dto/createList.dto";
import { ListDto } from "./dto/list.dto";
import { GetListDto } from "./dto/getList.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { EditListDto } from "./dto/editList.dto";
import { DeleteListDto } from "./dto/deleteList.dto";

@Controller('list')
@ApiTags('Лист')
@ApiBearerAuth('JWT-auth')
export class ListController {

  constructor(private listService: ListService) {
  }

  @ApiOperation({summary: 'Создание листа'})
  @ApiResponse({status: 201, example: { message: 'Лист успешно создан' }})
  @Post('/createList')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createBoard(
    @Body() createListDto: CreateListDto,
  )
  {
    return this.listService.createList(createListDto)
  }

  @ApiOperation({summary: 'Удаление листа'})
  @ApiResponse({status: 200, example: { message: 'Лист успешно удален' }})
  @Delete('/deleteList')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteBoard(
    @Query() deleteListDto: DeleteListDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.listService.deleteList({
        ...deleteListDto,
        userId: request?.user?.id,
      })
    } catch (error){
      throw error;
    }
  }

  @ApiOperation({summary: 'Изменение листа'})
  @ApiResponse({status: 200, example: { message: 'Лист успешно изменен' }})
  @Put('/editList')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  editBoard(
    @Body() editBoardDto: EditListDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.listService.editList({
        ...editBoardDto,
        userId: request.user.id,
      })
    } catch (error){
      throw error;
    }
  }

  @ApiOperation({summary: 'Получение листов'})
  @ApiResponse({status: 200, type: [ListDto]})
  @Get('/list')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getBoard(
    @Query() getListDto: GetListDto,
    @Req() request: AuthenticatedRequest
  ){
    return this.listService.getAllList({
      ...getListDto,
      userId: request.user.id,
    })
  }
}
