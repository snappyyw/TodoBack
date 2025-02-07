import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { List } from "../list/list.model";
import { BoardModule } from "../board/board.module";
import { ListModule } from "../list/list.module";
import { Task } from "./task.model";

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    BoardModule,
    ListModule,
    SequelizeModule.forFeature([List, Task])
  ],
})
export class TaskModule {}
