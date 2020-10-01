import {Module} from "@nestjs/common";
import {DoctorController} from "./doctor.controller";
import {DoctorService} from "./doctor.service";
import {DoctorEntity} from "./doctor.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule
            .forFeature([
                    DoctorEntity
                ],
                'default') //nombre de la cadena de conexion
    ],
    controllers: [
        DoctorController
    ],
    providers:[
        DoctorService
    ],
})
export class DoctorModule{

}