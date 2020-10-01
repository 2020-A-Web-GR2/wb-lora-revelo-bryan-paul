import {IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length} from "class-validator";

export class DoctorDtoUpdate{

    @IsString()
    @IsNotEmpty()
    @Length(5,120)
    nombreCompleto: string;

    @IsOptional()
    cedula?: string

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