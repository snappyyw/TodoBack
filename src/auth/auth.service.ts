import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { User } from "../users/users.model";
import { validatePassword } from "./lib/helpPassword";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async login(loginDto: LoginDto){
    const user = await this.userService.getUserByEmail(loginDto.email)

    if(!user){
      throw new HttpException('Неверный email или пароль', HttpStatus.UNAUTHORIZED)
    }

    const passwordEquals = await bcrypt.compare(loginDto.password, user.password)

    if(passwordEquals){
      return this.generateToken(user);
    } else {
      throw new HttpException('Неверный email или пароль', HttpStatus.UNAUTHORIZED)
    }
  }

  async registration(registrationDto: RegistrationDto){
    const userDb = await this.userService.getUserByEmail(registrationDto.email)

    if(userDb){
      throw new HttpException('Email уже занят', HttpStatus.CONFLICT)
    }

    const errorValidPassword = validatePassword(registrationDto.password)

    if(errorValidPassword){
      throw new HttpException(errorValidPassword, HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(registrationDto.password, 10);
    const user = await this.userService.createUser({...registrationDto, password: hashPassword})

    return this.generateToken(user);
  }

  private async generateToken(user: User){
    const payload = {email: user.email, id: user.id}

    return{
      token: this.jwtService.sign(payload)
    }
  }
}
