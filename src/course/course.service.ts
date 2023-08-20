import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(name?: string): Promise<Course[]> {

    const queryBuilder = this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.students', 'students')

    if (name) {
      queryBuilder
        .where('course.courseName LIKE :name', { name: `%${name}%` })
    }

    return queryBuilder.getMany()
  }

  async findById(id: number) {
    return this.courseRepository.findOne({
      where: {
        courseId: id
      }
    })
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {

    const isRegistered = await this.findById(id)

    if (!isRegistered) {
      throw new NotFoundException(`O curso com o id ${id} não existe!`)
    }

    const { courseName, courseLoad } = updateCourseDto

    const course = await this.courseRepository.preload({
      courseId: id,
      ...updateCourseDto
    })


    if (courseName) {
      course.courseName = courseName.toUpperCase()
    }

    if (courseLoad) {
      course.courseLoad = courseLoad
    }


    return this.courseRepository.save(course)
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
