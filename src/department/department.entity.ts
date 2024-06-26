import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description : string;

    @OneToOne(() => User)
    @JoinColumn()
    hod :User;

    @OneToMany(() => User, user => user.department)
    members: User[];

    @OneToMany(() => Project, project => project.department)
    projects: Project[];
}