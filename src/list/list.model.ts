import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { Board } from "../board/board.model";
import { Task } from "../task/task.model";

interface BoardCreationAttrs {
  name: string;
}

@Table({tableName: 'list'})
export class List extends Model<List, BoardCreationAttrs> {
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
  id: string;

  @ApiProperty({example: 'New list', description: 'Наименование листа'})
  @Column({type: DataType.STRING, unique: false, allowNull: false})
  name: string;

  @ForeignKey(() => Board)
  @Column({type: DataType.UUID, allowNull: false})
  boardId: string;

  @BelongsTo(() => Board)
  board: Board

  @HasMany(() => Task)
  task: Task[];
}
