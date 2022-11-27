import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import User from './user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { ClassesModule } from './classes/classes.module';
import { Class } from './classes/entities/class.entity';
import { Exam } from './exams/entities/exam.entity';
import { Question } from './questions/entities/question.entity';
import { AnsweresModule } from './answeres/answeres.module';
import { Answere } from './answeres/entities/answere.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mauFJcuf5dhRMQrjj',
      database: 'exam-db',
      entities: [User, Class, Exam, Question, Answere],
      synchronize: true,
    }),
    UserModule,
    AuthenticationModule,
    PassportModule,
    QuestionsModule,
    ExamsModule,
    ClassesModule,
    AnsweresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
