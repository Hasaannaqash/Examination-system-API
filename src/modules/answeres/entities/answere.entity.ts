import { Question } from '../../questions/entities/question.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import User from '../../user/user.entity';

@Entity()
export class Answere {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public selectedOption: number;

  @ManyToOne(() => Question, (question) => question.exam)
  public question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  public student: User;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  public exam: Exam;
}
