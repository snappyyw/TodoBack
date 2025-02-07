import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { List } from "../list/list.model";

interface TaskCreationAttrs {
  name: string;
  isActive: string;
  listId: string;
}

@Table({tableName: 'task'})
export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
  id: string;

  @ApiProperty({example: 'New task', description: 'Наименование задачи'})
  @Column({type: DataType.STRING, unique: false, allowNull: false})
  name: string;

  @ApiProperty({example: 'true', description: 'Статус задачи(активная/неактивная)'})
  @Column({type: DataType.BOOLEAN, unique: false, allowNull: false})
  isActive: boolean;

  @ForeignKey(() => List)
  @Column({type: DataType.UUID, allowNull: false})
  listId: string;

  @BelongsTo(() => List)
  list: List
}
