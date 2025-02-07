import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from "./users.model";
import { Board } from "../board/board.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Board])
  ],
  exports: [UsersService]
})
export class UsersModule {}
