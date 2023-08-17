import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Student')
export class Student {

    @PrimaryGeneratedColumn({ name: 'student_id' })
    studentId: number;

    @Column({ name: 'student_name' })
    studentName: string;

    @Column({ name: 'student_enrollment' })
    studentEnrollmet: number;


    @ManyToMany(() => Course)
    @JoinTable({
        name: 'student_course',
        joinColumn: {
            name: 'student_id',
            referencedColumnName: 'studentId'
        },
        inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'courseId'
        }
    })
    courses: Course[]

}
