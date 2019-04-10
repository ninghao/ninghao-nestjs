import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'qHqPHVPasjfHDCrcX7Ao7x5O5W098RU3i6lloVgWZFY=',
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
