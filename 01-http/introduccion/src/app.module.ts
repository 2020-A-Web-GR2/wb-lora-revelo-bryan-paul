import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
    imports: [
        //aquí van otros modulos
        HttpJuegoModule
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
