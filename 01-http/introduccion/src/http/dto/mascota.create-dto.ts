//@IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()
//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsPositive()
//@IsOptional()
//@IsNumber()
import {IsAlpha, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Length} from "class-validator";

export class MascotaCreateDto {

    @IsAlpha()
    @IsNotEmpty()
    @Length(3,60)
    nombre: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    edad: number; //entero

    @IsBoolean()
    @IsNotEmpty()
    casada: boolean;

    @IsBoolean()
    @IsOptional()
    ligada?: boolean; // signo ? para opcionales

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    peso: number; //decimal
}