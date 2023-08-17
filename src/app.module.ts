import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'rmv',
      password: '12345',
      database: 'course',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CourseModule,
    StudentModule,
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
