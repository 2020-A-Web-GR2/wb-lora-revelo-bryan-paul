import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index(['nombre', 'apellido', 'cedula', 'fechaNacimiento'])
//@Index( //indice compuesto
//    ['nombre', 'apellido', 'cedula'], {unique: true})
@Entity('db_usuario') //nombre tabla usuario
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id',
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true,
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        length: '60',
        nullable: true,
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        length: '18',
        nullable: false,
        unique: true,
    })
    cedula: string

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, //1000000000.
        scale: 4, //.0001
    })
    sueldo?: number;

    @Column({
        name: 'fecha_nacimiento',
        nullable: true,
        type: 'date',
    })
    fechaNacimiento?: string;

    @Column({
        name: 'fecha_hora_nacimiento',
        nullable: true,
        type: 'datetime',
    })
    fechaHoraNacimiento?: string;

    @OneToMany(
        type => MascotaEntity, //Con que entidad se relaciona
        mascota => mascota.usuario //Campo con el que se relaciona
    )
    mascotas: MascotaEntity[];

}