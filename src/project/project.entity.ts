import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../department/department.entity';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Department, department => department.projects)
    department: Department[];

    @OneToMany(() => Task, task => task.project)
    tasks: Task[];
}