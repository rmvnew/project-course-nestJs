import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {


  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) { }

  async create(createCourseDto: CreateCourseDto) {

    const { courseName } = createCourseDto

    const isRegistered = await this.findByName(courseName.toUpperCase())

    if (isRegistered) {
      throw new BadRequestException(` 
      O Curso ${courseName.toUpperCase()} já está registrado!`)
    }

    const course = this.courseRepository.create(createCourseDto)
    course.courseName = courseName.toUpperCase()

    return this.courseRepository.save(course)
  }

  async findByName(name: string): Promise<Course | null> {
    return this.courseRepository.findOne({
      where: {
        courseName: name
      }
    })
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
