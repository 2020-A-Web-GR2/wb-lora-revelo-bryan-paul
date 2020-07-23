import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";

@Module({
    imports: [
        //aquí van otros modulos
        HttpJuegoModule,
        HttpCalculadoraModule
    ],
    controllers: [
        //aqui van controladores de app modulet

        AppController],
    providers: [
        //aqui van servicios de app module
        AppService],
})
export class AppModule {
}
