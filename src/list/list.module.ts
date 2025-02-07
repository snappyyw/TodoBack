import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { Board } from "../board/board.model";
import { List } from "./list.model";

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    SequelizeModule.forFeature([Board, List])
  ]
})
export class ListModule {}
