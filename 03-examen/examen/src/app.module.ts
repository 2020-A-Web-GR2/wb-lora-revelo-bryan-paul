import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DoctorEntity} from "./doctor/doctor.entity";
import {DoctorModule} from "./doctor/doctor.module";
import {AutenticacionModule} from "./autenticacion/autenticacion.module";

@Module({
    imports: [
        DoctorModule,
        AutenticacionModule,
        TypeOrmModule.forRoot({
            //Cadena de conexion
            name: 'default', //nombre de la conexion
            type: 'mysql', //mysql, postgres, etc
            host: 'localhost', //ip
            port: 3306, //puerto
            username: 'root', //usuario
            password: '099051271Paul', //contrasena
            database: 'examen', //Base de datos
            entities: [ //Todas las entidades que se van a usar o conectar
                DoctorEntity,
            ],
            synchronize: true, //Actualiza el esquema de la bdd
            dropSchema: false, //Eliminar datos y el esquema de la bdd
        }),],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule {
}
