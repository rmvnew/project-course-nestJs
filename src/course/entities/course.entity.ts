import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Course')
export class Course {


  @PrimaryGeneratedColumn({ name: 'course_id' })
  courseId: number;

  @Column({ name: 'course_name' })
  courseName: string;

  @Column({ name: 'course_load' })
  courseLoad: number;


  @ManyToMany(() => Student, student => student.courses)
  students: Student[]


}



