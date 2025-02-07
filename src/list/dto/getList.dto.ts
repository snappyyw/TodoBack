import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID } from "class-validator";

export class GetListDto {
  @IsUUID(4, { message: 'Некорректный формат ID' })
  @IsDefined({message: 'Обязательнеый параметр'})
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id борда'})
  readonly boardId: string;

  userId: string;
}
