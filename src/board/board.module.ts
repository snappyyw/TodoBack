import { Module } from '@nestjs/common';
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Board } from "./board.model";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    SequelizeModule.forFeature([User, Board])
  ]
})
export class BoardModule {}
