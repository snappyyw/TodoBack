import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, Length, MaxLength } from "class-validator";

export class RegistrationDto{
  @ApiProperty({example: 'flex@yandex.com', description: 'Почта'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @IsString({message: 'Должен быть строкой'})
  @MaxLength(50, {message: 'Параметр не должен содежать более 50 символова'})
  @IsEmail({}, {message: 'Некорректный email'})
  readonly email: string;

  @ApiProperty({example: '1ddc0gg3', description: 'Пароль'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @Length(4,16, {message: 'Не менее 4 и не более 16'})
  @IsString({message: 'Должен быть строкой'})
  readonly password: string;

  @ApiProperty({example: 'Иван', description: 'Имя пользователя'})
  @IsDefined({message: 'Обязательнеый параметр'})
  @MaxLength(50, {message: 'Параметр не должен содежать более 50 символова'})
  @IsString({message: 'Должен быть строкой'})
  readonly name: string;
}
