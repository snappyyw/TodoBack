import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn')
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ]
})
export class AuthModule {}
