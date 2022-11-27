import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import RequestWithUser from '../authentication/local/requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/local/jwt-authentication.guard';

@Controller('exams')
@ApiTags('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll(@Req() request: RequestWithUser) {
    return this.examsService.findAll(request.user.classes);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthenticationGuard)
  publishExam(@Param('id') id: string) {
    return this.examsService.publishExam(+id);
  }

  @Get('student/:id/results')
  @UseGuards(JwtAuthenticationGuard)
  getResults(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.examsService.getResults(+id, request.user.id);
  }
}
