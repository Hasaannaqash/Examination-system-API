import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import { Class } from '../../classes/entities/class.entity';
import { Answere } from '../../answeres/entities/answere.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column()
  public optionOne: string;

  @Column()
  public optionTwo: string;

  @Column()
  public optionThree: string;

  @Column()
  public optionFour: string;

  @Column()
  public correctOption: number;

  @Column()
  public marks: number;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  public exam: Exam;

  @OneToMany(() => Answere, (answere) => answere.question)
  public answers: Answere[];
}
