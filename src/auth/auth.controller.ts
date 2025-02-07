import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { TokenDto } from "./dto/token.dto";

@ApiTags('Авторизация/Регистрация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiResponse({status: 201, type: TokenDto})
  @ApiOperation({summary: 'Авторизация'})
  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @ApiResponse({status: 201, type: TokenDto})
  @ApiOperation({summary: 'Регистрация'})
  @Post('/registration')
  @HttpCode(201)
  registration(@Body() userDto: RegistrationDto){
    return this.authService.registration(userDto)
  }
}
