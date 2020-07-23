import {IsAlpha, IsNotEmpty, Length} from "class-validator";

export class UsuarioCreateDTO{
    @IsAlpha()
    @IsNotEmpty()
    @Length(3,100)
    nombreDeUsuario:string;
}