import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { WhereOptions } from "sequelize";

import { User } from "./users.model";
import { RegistrationDto } from "../auth/dto/registration.dto";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private  userRepository: typeof User) {
  }

  async createUser(registrationDto: RegistrationDto){
    return await this.userRepository.create(registrationDto)
  }

  async findUserById(id: string){
    return await this.userRepository.findOne({
      where: { id } as WhereOptions<User>
    })
  }

  async getUserByEmail(email: string){
    return await this.userRepository.findOne({
      where: { email } as WhereOptions<User>
    });
  }
}
