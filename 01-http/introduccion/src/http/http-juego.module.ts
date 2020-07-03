// @nombre() -> decorador

import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";

@Module({
    imports: [
        //aquí van otros modulos
    ],
    controllers: [
        HttpJuegoController
        //aqui van controladores de http module

    ],
    providers: [
        //aqui van servicios de app module
    ],
})

export class HttpJuegoModule {

}