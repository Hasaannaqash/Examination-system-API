import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { Class } from '../classes/entities/class.entity';
import { Answere } from '../answeres/entities/answere.entity';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private ExamRepository: Repository<Exam>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Answere)
    private answerRepository: Repository<Answere>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createExamDto: CreateExamDto) {
    console.log(createExamDto);
    const classs = await this.classRepository.findOne({
      where: { id: createExamDto.classId },
    });
    if (classs) {
      // dto to entity mapping
      const exam = new Exam();
      Object.assign(exam, createExamDto);
      exam.class = classs;
      exam.questions = null;
      exam.answers = null;
      return this.ExamRepository.save(exam);
    }
  }

  findAll(classes: Class[]) {
    return this.ExamRepository.find({ where: { class: classes } });
  }

  async findOne(id: number) {
    const exam = await this.ExamRepository.findOne({
      where: { id: id },
      relations: ['questions'],
    });
    exam.questions.forEach((question) => {
      delete question.correctOption;
    });
    return exam;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return this.ExamRepository.update(id, updateExamDto);
  }

  remove(id: number) {
    return this.ExamRepository.delete(id);
  }

  publishExam(number: number) {
    return this.ExamRepository.update(number, { published: true });
  }

  async getResults(examId: number, studentId: number) {
    const answers = await this.answerRepository.query(
      `select * from answere where examId=${examId} and studentId=${studentId}`,
    );
    // check if answers are empty
    if (answers.length === 0) {
      console.log('No answers found');
      return ;
    }
    console.log(answers);
    const questions = await this.questionRepository.query(
      `select * from question where examId=${examId}`,
    );
    const exam = await this.ExamRepository.findOne({
      where: { id: examId },
    });
    let correctAnswers = 0;
    let lostPoints = 0;
    let result = 0;
    let wrongAnswers = 0;
    let notAnswered = 0;
    let isPassed = false;
    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question.correctOption === answer.selectedOption) {
        correctAnswers++;
        result += question.marks;
      } else if (answer.selectedOption === null) {
        notAnswered++;
        lostPoints += question.marks;
      } else {
        wrongAnswers++;
        lostPoints += question.marks;
      }
    });

    if (result >= exam.passMark || result >= lostPoints + result) {
      isPassed = true;
    }
    return {
      correctAnswers,
      wrongAnswers,
      notAnswered,
      lostPoints,
      result,
      isPassed: isPassed,
    };
  }
}
