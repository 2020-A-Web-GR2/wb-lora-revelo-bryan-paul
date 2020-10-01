import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";
import {DoctorEntity} from "./doctor.entity";

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(DoctorEntity)
        private repositorio: Repository<DoctorEntity>
    ) {

    }

    crearUno(nuevoDoctor: DoctorEntity) {
        return this.repositorio.save(nuevoDoctor);
    }

    buscarTodos(textoDeConsulta?: string) {
        const consulta: FindManyOptions<DoctorEntity> = {
            where: [
                {
                    nombreCompleto: Like(`%${textoDeConsulta}%`)
                },
                {
                    especialidad: Like(`%${textoDeConsulta}%`)
                },
            ]
        }
        return this.repositorio.find(consulta);
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id);
    }

    editarUno(doctorEditado: DoctorEntity) {
        return this.repositorio.save(doctorEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }

}