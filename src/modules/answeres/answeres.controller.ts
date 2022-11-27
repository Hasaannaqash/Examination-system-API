import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { AnsweresService } from './answeres.service';
import { CreateAnswereDto } from './dto/create-answere.dto';
import { UpdateAnswereDto } from './dto/update-answere.dto';
import JwtAuthenticationGuard from "../authentication/local/jwt-authentication.guard";

@Controller('answeres')
export class AnsweresController {
  constructor(private readonly answeresService: AnsweresService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createAnswerDto: CreateAnswereDto[]) {
    console.log(createAnswerDto);
    return this.answeresService.create(createAnswerDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.answeresService.findAll();
  }

  @Get('students/:studentId')
  @UseGuards(JwtAuthenticationGuard)
  getExamByStudent(@Param('studentId') studentId: number) {
    return this.answeresService.getExamByStudent(studentId);
  }
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param('id') id: string) {
    return this.answeresService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateAnswereDto: UpdateAnswereDto) {
    return this.answeresService.update(+id, updateAnswereDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.answeresService.remove(+id);
  }
}
