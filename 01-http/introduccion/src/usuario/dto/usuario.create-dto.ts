import {IsAlpha, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Length} from "class-validator";

export class UsuarioCreateDto{

    @IsAlpha()
    @IsOptional()
    @Length(3,60)
    nombre?: string

    @IsAlpha()
    @IsOptional()
    @Length(3,60)
    apellido?: string

    @IsNotEmpty()
    @IsNumberString()
    @Length(10, 18)
    cedula: string

    @IsNumber()
    @IsOptional()
    sueldo?: number;

    @IsOptional()
    fechaNacimiento?: string;

    @IsOptional()
    @IsDateString()
    fechaHoraNacimiento?: string;

}