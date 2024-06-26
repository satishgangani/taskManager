import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { ProjectModule } from './project/project.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';


@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AuthModule, UserModule, DepartmentModule, ProjectModule, TasksModule],
  controllers: [AppController],
  providers: [AppService , {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  Reflector,],
})
export class AppModule { }
