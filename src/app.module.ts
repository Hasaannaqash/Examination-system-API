import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import User from './user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/local.strategy';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mauFJcuf5dhRMQrjj',
      database: 'exam-db',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthenticationModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
