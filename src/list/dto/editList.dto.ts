import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, IsUUID, MaxLength } from "class-validator";

export class EditListDto {
  @ApiProperty({example: 'List', description: 'Новое наименование листа'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @MaxLength(50, {message: 'Параметр не должен содежать более 50 символова'})
  @IsString({message: 'Должен быть строкой'})
  readonly name: string;

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
