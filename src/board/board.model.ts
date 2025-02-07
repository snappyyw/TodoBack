import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "../users/users.model";
import { List } from "../list/list.model";

interface BoardCreationAttrs {
  name: string;
}

@Table({tableName: 'board'})
export class Board extends Model<Board, BoardCreationAttrs> {
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
  id: string;

  @ApiProperty({example: 'New board', description: 'Наименование борда'})
  @Column({type: DataType.STRING, unique: false, allowNull: false})
  name: string;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID, allowNull: false})
  userId: string;

  @BelongsTo(() => User)
  author: User

  @HasMany(() => List)
  list: List[];
}
