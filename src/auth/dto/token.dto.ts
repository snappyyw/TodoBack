import { ApiProperty } from "@nestjs/swagger";

export class TokenDto{
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Токен'})
  readonly token: string;
}
