import { Exclude } from 'class-transformer';
import { Department } from 'src/department/department.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
export enum roles {
    user = 'user',
    admin = 'admin'
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: roles, default: roles.user })
    role: roles;

    @ManyToOne(() => Department, department => department.id)
    department: Department

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
