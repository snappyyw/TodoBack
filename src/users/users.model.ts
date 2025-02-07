import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { Board } from "../board/board.model";

interface UserCreationAttrs {
  email: string;
  password: string;
  name: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
  id: string;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, unique: false, allowNull: false})
  password: string;

  @Column({type: DataType.STRING, unique: false, allowNull: false})
  name: string;

  @HasMany(() => Board)
  board: Board[];
}
