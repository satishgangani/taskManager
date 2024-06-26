import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { roles } from 'src/user/user.entity';
import { CreateDepartmentDto } from './department.dto';
import { Roles } from 'src/decorator/role.decorator';

@Controller('/api/v1/department')
export class DepartmentController {
    constructor(private readonly departmentService : DepartmentService){}

    @Post('/create')
    @UseGuards(AuthGuard)
    @Roles(roles.admin)
    create(@Body() CreateDepartmentDto:CreateDepartmentDto){
        return this.departmentService.create(CreateDepartmentDto);
    }
}
