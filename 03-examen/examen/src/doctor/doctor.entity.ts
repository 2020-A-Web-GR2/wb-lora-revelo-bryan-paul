import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_doctor')
export class DoctorEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id',
    })
    id: number;

    @Column({
        name: 'nombre_completo',
        type: 'varchar',
        length: '120',
    })
    nombreCompleto: string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        length: '18',
        nullable: false,
        unique: true,
    })
    cedula: string

    @Column({
        name: 'especialidad',
        type: 'varchar',
        length: '150',
    })
    especialidad: string;

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, //1000000000.
        scale: 2, //.01
    })
    sueldo?: number;

    @Column({
        name: 'lugar_trabajo',
        type: 'varchar',
        length: '150',
        nullable: true,
    })
    lugarDeTrabajo?: string;

    @Column({
        name: 'nacionalidad',
        type: 'varchar',
        length: '100',
        nullable: true,
    })
    nacionalidad?: string;

}