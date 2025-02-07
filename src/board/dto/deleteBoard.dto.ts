import { ApiProperty } from "@nestjs/swagger";

export class DeleteBoardDto {
  @ApiProperty({example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Id борда'})
  readonly boardId: string;

  readonly userId: string;
}
