import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { Exam } from '../exams/entities/exam.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const examEntity: Exam = await this.examRepository.findOne({
      where: { id: createQuestionDto.examId },
    });
    if (examEntity) {
      const question = new Question();
      Object.assign(question, createQuestionDto);
      question.exam = examEntity;
      return this.questionRepository.save(question);
    }
    return this.questionRepository.save(createQuestionDto);
  }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
