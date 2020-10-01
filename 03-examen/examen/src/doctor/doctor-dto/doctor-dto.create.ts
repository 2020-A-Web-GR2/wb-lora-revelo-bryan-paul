import {IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length} from "class-validator";


export class DoctorDtoCreate{

    @IsString()
    @IsNotEmpty()
    @Length(5,120)
    nombreCompleto: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 18)
    cedula: string

    @IsString()
    @IsNotEmpty()
    @Length(3,150)
    especialidad: string;

    @IsNumber()
    @IsOptional()
    sueldo?: number;

    @Length(3,150)
    @IsOptional()
    lugarDeTrabajo?: string;

    @IsString()
    @IsOptional()
    @Length(3,100)
    nacionalidad?: string;
}