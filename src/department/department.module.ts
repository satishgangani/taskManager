import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Department } from './department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, User])],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
