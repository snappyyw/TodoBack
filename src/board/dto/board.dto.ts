import { ApiProperty } from "@nestjs/swagger";

export class BoardDto {
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id борда'})
  readonly id: string;

  @ApiProperty({example: 'Board', description: 'Наименование борда'})
  readonly name: string;
}
