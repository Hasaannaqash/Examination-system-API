import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswereDto } from './dto/create-answere.dto';
import { UpdateAnswereDto } from './dto/update-answere.dto';
import { Repository } from 'typeorm';
import { Answere } from './entities/answere.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '../exams/entities/exam.entity';
import User from '../user/user.entity';
import { Question } from '../questions/entities/question.entity';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class AnsweresService {
  constructor(
    @InjectRepository(Answere)
    private readonly answersRepository: Repository<Answere>,
    @InjectRepository(Exam)
    private readonly examsRepository: Repository<Exam>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    private readonly examsService: ExamsService,
  ) {}
  async create(createAnswerDto: CreateAnswereDto[]) {
    for (const [key, value] of Object.entries(createAnswerDto)) {
      const student = await this.usersRepository.findOne({
        where: { id: value.studentId },
      });
      const exam = await this.examsRepository.findOne({
        where: { id: value.examId },
      });
      const question = await this.questionsRepository.findOne({
        where: { id: value.questionId },
      });
      const answer = new Answere();
      answer.selectedOption = value.selectedOption;
      answer.student = student;
      answer.exam = exam;
      answer.question = question;
      await this.answersRepository.save(answer);
    }
    return 'Answeres created';
  }

  findAll() {
    return `This action returns all answeres`;
  }

  getAnsweresByStudentAndExam(studentId: number, examId: number) {}

  findOne(id: number) {
    return `This action returns a #${id} answere`;
  }

  update(id: number, updateAnswereDto: UpdateAnswereDto) {
    return `This action updates a #${id} answere`;
  }

  remove(id: number) {
    return `This action removes a #${id} answere`;
  }

  async getExamByStudent(studentId: number) {
    const student = await this.usersRepository.findOne({
      where: { id: studentId },
    });
    const exams = await this.answersRepository.find({
      where: { student: student },
      relations: ['exam'],
    });

    // remove duplicate exams exams.exam.id
    const uniqueExams = exams.filter((exam, index, self) => {
      return index === self.findIndex((t) => t.exam.id === exam.exam.id);
    });
    console.log(JSON.stringify(uniqueExams));

    // for each exam call examsService.getResult(examId, studentId)
    const ExamsResult = [];
    // lopp through uniqueExams
    for (const [key, value] of Object.entries(uniqueExams)) {
      console.log('key=> ', key);
      console.log('val =>', value);
      const result = await this.examsService.getResults(
        value.exam.id,
        studentId,
      );
      Object.assign(uniqueExams[key], { result: result });
      ExamsResult.push(uniqueExams[key]);
    }
    return ExamsResult;
  }
}
