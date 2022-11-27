import {
  Column,
  Entity, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Class } from '../../classes/entities/class.entity';
import { Question } from '../../questions/entities/question.entity';
import { Answere } from '../../answeres/entities/answere.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @Column()
  public passMark: number;
  @Column()
  public examStatus: string;
  @Column()
  public examDate: Date;
  @Column()
  public examDuration: number;

  @Column({ default: false })
  public published: boolean;
  @ManyToOne(() => Class, (classs) => classs.exams, { onDelete: 'CASCADE' })
  public class: Class;

  @OneToMany(() => Question, (question) => question.exam, { onDelete: 'CASCADE' })
  public questions: Question[];

  @OneToMany(() => Answere, (answer) => answer.exam, { onDelete: 'CASCADE' })
  public answers: Answere[];
}
