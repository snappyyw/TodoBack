import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { BoardService } from "./board.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { AuthenticatedRequest } from "../auth/interface/interface";
import { BoardDto } from "./dto/board.dto";
import { EditBoardDto } from "./dto/editBoard.dto";
import { DeleteBoardDto } from "./dto/deleteBoard.dto";

@Controller('board')
@ApiTags('Доска')
@ApiBearerAuth('JWT-auth')
export class BoardController {

  constructor(private boardService: BoardService) {
  }

  @ApiOperation({summary: 'Создание доски'})
  @ApiResponse({status: 201, example: { message: 'Доска успешно создана' }})
  @Post('/createBoard')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() request: AuthenticatedRequest
  )
  {
    return this.boardService.createBoard({
      ...createBoardDto,
      userId: request?.user?.id,
    })
  }

  @ApiOperation({summary: 'Удаление доски'})
  @ApiResponse({status: 200, example: { message: 'Доска успешно удалена' }})
  @Delete('/deleteBoard')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteBoard(
    @Query() deleteBoardDto: DeleteBoardDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.boardService.deleteBoard({
        ...deleteBoardDto,
        userId: request?.user?.id,
      })
    } catch (error){
      throw error;
    }
  }

  @ApiOperation({summary: 'Изменение доски'})
  @ApiResponse({status: 200, example: { message: 'Доска успешно изменена' }})
  @Put('/editBoard')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  editBoard(
    @Body() createBoardDto: EditBoardDto,
    @Req() request: AuthenticatedRequest
  )
  {
    try {
      return this.boardService.editBoard({
        ...createBoardDto,
        userId: request?.user?.id,
      })
    } catch (error){
      throw error;
    }
  }

  @ApiOperation({summary: 'Получение досок'})
  @ApiResponse({status: 200, type: [BoardDto]})
  @Get('/boards')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getBoard(
    @Req() request: AuthenticatedRequest
  ){
    return this.boardService.getAllBoard(request?.user?.id)
  }
}
