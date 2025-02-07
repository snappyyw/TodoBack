import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";

import jwtConfig from "./config/jwt.config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { Board } from "./board/board.model";
import { ListModule } from './list/list.module';
import { List } from "./list/list.model";
import { TaskModule } from './task/task.module';
import { Task } from "./task/task.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [jwtConfig],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Board, List, Task],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    BoardModule,
    ListModule,
    TaskModule,
  ],
})
export class AppModule{

}
