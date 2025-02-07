import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { Board } from "../board/board.model";
import { List } from "./list.model";
import { BoardModule } from "../board/board.module";

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [
    BoardModule,
    SequelizeModule.forFeature([Board, List])
  ],
  exports: [ListService]
})
export class ListModule {}
