import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsString, IsUUID, MaxLength } from "class-validator";

export class EditTaskDto {
  @ApiProperty({example: 'List', description: 'Новое наименование задачи'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @MaxLength(50, {message: 'Параметр не должен содежать более 50 символова'})
  @IsString({message: 'Должен быть строкой'})
  readonly name: string;

  @ApiProperty({example: true, description: 'Новой статус задачи'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @IsBoolean({message: 'Должен быть boolean'})
  readonly isActive: boolean;

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
