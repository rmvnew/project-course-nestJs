import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll(
    @Query('name') name: string
  ) {
    return this.courseService.findAll(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
