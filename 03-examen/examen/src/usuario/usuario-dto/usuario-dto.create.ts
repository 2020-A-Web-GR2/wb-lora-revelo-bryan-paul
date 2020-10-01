import {IsString, Length} from "class-validator";

export class UsuarioDtoCreate{

    @IsString()
    @Length(5,50)
    usuario: string;

    @IsString()
    @Length(5,50)
    password: string;
}