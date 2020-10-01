import {Module} from "@nestjs/common";

import {DoctorController} from "../doctor/doctor.controller";
import {DoctorService} from "../doctor/doctor.service";
import {AutenticacionController} from "./autenticacion.controller";

@Module({
    imports:[
    ],
    controllers: [
        AutenticacionController
    ],
    providers:[
    ],
})
export class AutenticacionModule{

}