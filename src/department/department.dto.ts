import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    hodId: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    memberIds: number[];
}
