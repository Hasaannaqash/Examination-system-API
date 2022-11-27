import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Class } from '../classes/entities/class.entity';
import { Answere } from '../answeres/entities/answere.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  role: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Class, (classs) => classs.instructor)
  public classes: Class[];

  @OneToMany(() => Answere, (answer) => answer.student)
  public answers: Answere[];
}
export default User;
