import { Body, Controller, Post } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { RegistrationDto } from "../auth/dto/registration.dto";

@ApiExcludeController()
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Post()
  create(@Body() registrationDto: RegistrationDto){
    return this.usersService.createUser(registrationDto);
  }
}
