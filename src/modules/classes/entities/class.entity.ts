import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';
import User from '../../user/user.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => User, (user) => user.classes)
  public instructor: User;

  @ManyToMany(() => User)
  @JoinTable()
  public students: User[];

  @OneToMany(() => Exam, (exam) => exam.class)
  public exams: Exam[];
}
