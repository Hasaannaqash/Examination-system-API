import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { hasRoleLecturer } from '../../util/checkRole';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}
  async create(createClassDto: CreateClassDto, user: any) {
    hasRoleLecturer(user);
    const response = await this.classesRepository.save({
      ...createClassDto,
      instructor: user,
    });
    delete response.instructor;
    return response;
  }

  findAll(user: User) {
    hasRoleLecturer(user);
    return this.classesRepository.find({ where: { instructor: user } });
  }

  findOne(id: number) {
    return this.classesRepository.findOne({
      where: { id: id },
      relations: ['exams'],
    });
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classesRepository.update(id, updateClassDto);
  }

  remove(id: number) {
    return this.classesRepository.delete(id);
  }
  removePassword(classs: Class): any {
    delete classs.instructor.password;
  }

  async getClassesByUser(id: number) {
    const classes = await this.classesRepository.find({
      where: { students: { id: id } },
      relations: { students: true },
    });
    return classes;
  }

  joinClass(number: number, user: User) {
    try {
      return this.classesRepository
        .createQueryBuilder()
        .relation(Class, 'students')
        .of(number)
        .add(user)
        .then((res) => {
          return {
            status: HttpStatus.OK,
            message: 'Successfully joined class',
          };
        })
        .catch((err) => {
          return {
            status: HttpStatus.BAD_REQUEST,
            message: 'Failed to join class',
          };
        });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getStudents(number: number) {
    return this.classesRepository.findOne({
      where: { id: number },
      relations: ['students'],
    });
  }

  getExams(classId: number) {
    return this.classesRepository.findOne({
      where: { id: classId },
      relations: ['exams'],
    });
  }

  getClassByStudent(number: number) {
    return this.classesRepository.find({
      where: { students: { id: number } },
      relations: ['students'],
    });
  }

  async getClasses(user: User) {
    const classes = await this.classesRepository.find({
      relations: ['students'],
    });
    // return classes that the user is not a student in
    return classes.filter((classs) => {
      return !classs.students.some((student) => student.id === user.id);
    });
  }
}
