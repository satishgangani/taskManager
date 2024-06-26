import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateDepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(User) private UserRepository: Repository<User>,
    ) { }

    async create(CreateDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const { name, description, hodId } = CreateDepartmentDto;

        const hod = await this.UserRepository.findOne({ where: { id: hodId } });
        if (!hodId) {
            throw new Error(`This user doesn't exist`);
        }
        const department = this.departmentRepository.create({ name, description, hod });
        const savedDepartment = await this.departmentRepository.save(department);

        hod.department = savedDepartment;
        await this.UserRepository.save(hod);

        return savedDepartment;
    }
}
