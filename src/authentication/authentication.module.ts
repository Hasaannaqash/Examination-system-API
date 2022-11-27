import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { LocalSerializer } from './local.serializer';

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, LocalSerializer],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
