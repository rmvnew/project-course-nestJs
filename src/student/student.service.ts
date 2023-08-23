import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { Utils } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {


  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly courseService: CourseService
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {

    const { studentName, coursesId } = createStudentDto

    const isRegistered = await this.findByName(studentName.toUpperCase())

    if (isRegistered) {
      throw new BadRequestException(`O aluno já esta registrado`)
    }

    let studentCourses = []

    for (let index of coursesId) {
      const course = await this.courseService.findById(index)

      if (!course) {
        throw new NotFoundException(`O curso com id ${index} não encontrado!`)
      }

      studentCourses.push(course)
    }

    const student = this.studentRepository.create(createStudentDto)
    student.studentName = studentName.toUpperCase()
    student.studentEnrollment = Utils.getInstance().generateEnrollmentNumber()
    student.courses = studentCourses


    return this.studentRepository.save(student)
  }

  async findByName(name: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        studentName: name
      }
    })
  }

  async findAll(name?: string): Promise<Student[]> {

    const queryBuilder = this.studentRepository.createQueryBuilder('student')
      .leftJoinAndSelect('student.courses', 'courses')

    if (name) {
      queryBuilder
        .where('student.studentName LIKE :name', { name: `%${name}%` })
    }


    return queryBuilder.getMany()
  }

  async findById(id: number) {
    return this.studentRepository.findOne({
      where: {
        studentId: id
      }
    })
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {

    const { studentName, coursesId } = updateStudentDto

    const isRegistered = await this.findById(id)

    if (!isRegistered) {
      throw new NotFoundException(`O aluno com id ${id} não existe!`)
    }

    const student = await this.studentRepository.preload({
      studentId: id,
      ...updateStudentDto
    })

    if (studentName) {
      student.studentName = studentName.toUpperCase()
    }

    if (coursesId) {

      let studentCourses = []
      for (let index of coursesId) {
        const course = await this.courseService.findById(index)
        if (!course) {
          throw new NotFoundException(`O curso com id ${index} não existe!`)
        }
        studentCourses.push(course)
      }

      student.courses = studentCourses


    }


    return this.studentRepository.save(student)
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
