import { Module } from '@nestjs/common';
import { AnsweresService } from './answeres.service';
import { AnsweresController } from './answeres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answere } from './entities/answere.entity';
import { Question } from '../questions/entities/question.entity';
import User from '../user/user.entity';
import { Exam } from '../exams/entities/exam.entity';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answere, Exam, User, Question]),
    ExamsModule,
  ],
  controllers: [AnsweresController],
  providers: [AnsweresService],
})
export class AnsweresModule {}
