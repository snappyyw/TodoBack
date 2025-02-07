import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MaxLength } from "class-validator";

export class CreateBoardDto {
  @ApiProperty({example: 'Board', description: 'Наименование борда'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @MaxLength(50, {message: 'Параметр не должен содежать более 50 символова'})
  @IsString({message: 'Должен быть строкой'})
  readonly name: string;

  readonly userId: string;
}
