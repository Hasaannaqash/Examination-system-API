import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
export default User;
