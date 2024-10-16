import { Module } from '@nestjs/common';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InstructorModule, StudentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
