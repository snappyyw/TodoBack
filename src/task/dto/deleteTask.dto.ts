import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID } from "class-validator";

export class DeleteTaskDto {
  @IsUUID(4, { message: 'Некорректный формат ID' })
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id задачи'})
  @IsDefined({message: 'Обязательнеый параметр'})
  readonly taskId: string;

  @IsUUID(4, { message: 'Некорректный формат ID' })
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id листа'})
  @IsDefined({message: 'Обязательнеый параметр'})
  readonly listId: string;

  @IsUUID(4, { message: 'Некорректный формат ID' })
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id борда'})
  @IsDefined({message: 'Обязательнеый параметр'})
  readonly boardId: string;

  readonly userId: string;
}
