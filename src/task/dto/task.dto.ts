import { ApiProperty } from "@nestjs/swagger";

export class TaskDto {
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id задачи'})
  readonly id: string;

  @ApiProperty({example: 'List', description: 'Наименование задачи'})
  readonly name: string;

  @ApiProperty({example: true, description: 'Статус задачи'})
  readonly isActive: string;
}
