import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import RequestWithUser from '../authentication/local/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/local/jwt-authentication.guard';

@Controller('classes')
@ApiTags('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Req() request: RequestWithUser,
    @Body() createClassDto: CreateClassDto,
  ) {
    return this.classesService.create(createClassDto, request.user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll(@Req() request: RequestWithUser) {
    return this.classesService.findAll(request.user);
  }

  @Get('all')
  @UseGuards(JwtAuthenticationGuard)
  getClasses(@Req() request: RequestWithUser) {
    return this.classesService.getClasses(request.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthenticationGuard)
  joinClass(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.classesService.joinClass(+id, request.user);
  }
  // get all students in a class
  @Get(':id/students')
  @UseGuards(JwtAuthenticationGuard)
  getStudents(@Param('id') id: string) {
    return this.classesService.getStudents(+id);
  }

  // get all exams in a class
  @Get(':id/exams')
  @UseGuards(JwtAuthenticationGuard)
  getExams(@Param('id') id: string) {
    return this.classesService.getExams(+id);
  }

  // get class by student student
  @Get('student/:id')
  @UseGuards(JwtAuthenticationGuard)
  getClassByStudent(@Param('id') id: string) {
    return this.classesService.getClassByStudent(+id);
  }
}
