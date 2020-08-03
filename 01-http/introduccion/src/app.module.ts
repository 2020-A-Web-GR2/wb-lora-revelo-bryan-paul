import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpCalculadoraModule} from "./http-calculadora/http-calculadora.module";
import {UsuarioModule} from "./usuario/usuario-module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
    imports: [
        //aquí van otros modulos
        HttpJuegoModule,
        HttpCalculadoraModule,
        UsuarioModule,
        TypeOrmModule.forRoot({
            //Cadena de conexion
            name: 'default', //nombre de la conexion
            type: 'mysql', //mysql, postgres, etc
            host: 'localhost', //ip
            port: 3306, //puerto
            username: 'root', //usuario
            password: '099051271Paul', //contrasena
            database: 'ejemplo', //Base de datos
            entities: [ //Todas las entidades que se van a usar o conectar
                UsuarioEntity
            ],
            synchronize: true, //Actualiza el esquema de la bdd
            dropSchema: false, //Eliminar datos y el esquema de la bdd
        }),
    ],
    controllers: [
        //aqui van controladores de app module

        AppController],
    providers: [
        //aqui van servicios de app module
        AppService],
})
export class AppModule {
}
