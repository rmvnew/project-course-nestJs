import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../course/entities/course.entity";


@Entity('Student')
export class Student {
    static courses(arg0: () => typeof Student, courses: any): (target: import("../../course/entities/course.entity").Course, propertyKey: "") => void {
        throw new Error('Method not implemented.');
    }

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
