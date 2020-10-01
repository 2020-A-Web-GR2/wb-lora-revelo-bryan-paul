import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {DoctorService} from "./doctor.service";
import {DoctorDtoCreate} from "./doctor-dto/doctor-dto.create";
import {validate, ValidationError} from "class-validator";
import {DoctorEntity} from "./doctor.entity";
import {DoctorDtoUpdate} from "./doctor-dto/doctor-dto.update";

@Controller('doctor')
export class DoctorController {
    constructor(
        private readonly _doctorService: DoctorService,
    ) {

    }

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session,
    ) {
        const estaLogeado = session.username;
        if (estaLogeado) {
            let doctoresEncontrados;
            let busqueda = '';

            const existeBusqueda = parametrosConsulta.busqueda;

            if (existeBusqueda) {
                busqueda = parametrosConsulta.busqueda;
                console.log('busqueda' + busqueda);
            }

            try {
                doctoresEncontrados = await this._doctorService.buscarTodos(busqueda);
            } catch (error) {
                console.log(error)
                return res.redirect('/doctor/vista/inicio?error=No se encontraron doctores');
            }

            if (doctoresEncontrados) {
                return res.render(
                    'doctor/inicio',
                    {
                        arregloDoctores: doctoresEncontrados,
                        error: parametrosConsulta.error,
                    }
                )
            } else {
                return res.redirect('/doctor/vista/inicio?error=No se encontraron doctores');
            }
        } else {
            return res.redirect('/autenticacion/vista/login');
        }

    }


    @Get('vista/crear')
    crearDoctorVista(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session,
    ) {
        const estaLogeado = session.username;
        if (estaLogeado) {
            return res.render(
                'doctor/crear',
                {
                    error: parametrosConsulta.error,
                    nombreCompleto: parametrosConsulta.nombreCompleto,
                    especialidad: parametrosConsulta.especialidad,
                    cedula: parametrosConsulta.cedula,
                    sueldo: parametrosConsulta.sueldo,
                    lugarDeTrabajo: parametrosConsulta.lugarDeTrabajo,
                    nacionalidad: parametrosConsulta.nacionalidad,
                }
            )
        } else {
            return res.redirect('/autenticacion/vista/login');
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const doctorValido = new DoctorDtoCreate();

        doctorValido.nombreCompleto = parametrosCuerpo.nombreCompleto;
        doctorValido.cedula = parametrosCuerpo.cedula;
        doctorValido.especialidad = parametrosCuerpo.especialidad;
        doctorValido.sueldo = Number(parametrosCuerpo.sueldo);
        doctorValido.lugarDeTrabajo = parametrosCuerpo.lugarDeTrabajo;
        doctorValido.nacionalidad = parametrosCuerpo.nacionalidad;

        let nombreCompletoConsulta, cedulaConsulta, especialidadConsulta, sueldoConsulta, lugarDeTrabajoConsulta,
            nacionalidadConsulta;

        try {
            const errores: ValidationError[] = await validate(doctorValido);
            if (errores.length > 0) {
                nombreCompletoConsulta = `&nombreCompleto=${parametrosCuerpo.nombreCompleto}`;
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`;
                especialidadConsulta = `&especialidad=${parametrosCuerpo.especialidad}`;
                sueldoConsulta = `&sueldo=${parametrosCuerpo.sueldo}`;
                lugarDeTrabajoConsulta = `&lugarDeTrabajo=${parametrosCuerpo.lugarDeTrabajo}`;
                nacionalidadConsulta = `&nacionalidad=${parametrosCuerpo.nacionalidad}`;

                console.log('Error', errores);
                const mensajeError = 'Error creando doctor, los campos ingresados no son correctos'
                return res.redirect('/doctor/vista/crear?error=' + mensajeError + nombreCompletoConsulta + cedulaConsulta + especialidadConsulta + sueldoConsulta + lugarDeTrabajoConsulta + nacionalidadConsulta);
            } else {
                let respuestaCrearDoctor;
                try {
                    respuestaCrearDoctor = await this._doctorService.crearUno(parametrosCuerpo);
                    return res.redirect('/doctor/vista/inicio')
                } catch (error) {
                    console.error(error);
                    console.error('Error validadndo usuario catch fuera');
                    const mensajeError = 'Error creando doctor'
                    return res.redirect('/doctor/vista/crear?error=' + mensajeError);
                }
                return res.redirect('/doctor/vista/inicio')
            }
        } catch (error) {
            console.error(error);
            console.error('Error validadndo usuario catch fuera');
            const mensajeError = 'Error creando doctor, los campos ingresados no son correctos'
            return res.redirect('/doctor/vista/crear?error=' + mensajeError);
        }
    }

    @Get('vista/editar/:id')
    async editarDoctorVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session,
    ) {
        const estaLogeado = session.username;
        if (estaLogeado) {
            const id = Number(parametrosRuta.id);
            let doctorEncontrado;
            try {
                doctorEncontrado = await this._doctorService.buscarUno(id);
            } catch (error) {
                console.error('Error del servidor');
                return res.redirect('/doctor/vista/inicio?error=Error buscando doctor');
            }
            if (doctorEncontrado) {
                return res.render(
                    'doctor/crear',
                    {
                        error: parametrosConsulta.error,
                        doctor: doctorEncontrado,
                    }
                )
            } else {
                return res.redirect('/doctor/vista/inicio?error=Error buscando doctor');
            }
        } else {
            return res.redirect('/autenticacion/vista/login');
        }
    }


    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const id = parametrosRuta.id;
        const doctorValido = new DoctorDtoUpdate();

        doctorValido.nombreCompleto = parametrosCuerpo.nombreCompleto;
        doctorValido.cedula = parametrosCuerpo.cedula;
        doctorValido.especialidad = parametrosCuerpo.especialidad;
        doctorValido.sueldo = Number(parametrosCuerpo.sueldo);
        doctorValido.lugarDeTrabajo = parametrosCuerpo.lugarDeTrabajo;
        doctorValido.nacionalidad = parametrosCuerpo.nacionalidad;

        let nombreCompletoConsulta, cedulaConsulta, especialidadConsulta, sueldoConsulta, lugarDeTrabajoConsulta,
            nacionalidadConsulta;

        try {
            const errores: ValidationError[] = await validate(doctorValido);
            if (errores.length > 0) {
                nombreCompletoConsulta = `&nombreCompleto=${parametrosCuerpo.nombreCompleto}`;
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`;
                especialidadConsulta = `&especialidad=${parametrosCuerpo.especialidad}`;
                sueldoConsulta = `&sueldo=${parametrosCuerpo.sueldo}`;
                lugarDeTrabajoConsulta = `&lugarDeTrabajo=${parametrosCuerpo.lugarDeTrabajo}`;
                nacionalidadConsulta = `&nacionalidad=${parametrosCuerpo.nacionalidad}`;

                console.log('Error', errores);
                const mensajeError = 'Error editando doctor, los campos ingresados no son correctos'
                return res.redirect('/doctor/vista/editar/' + id + '?error=' + mensajeError + nombreCompletoConsulta + cedulaConsulta + especialidadConsulta + sueldoConsulta + lugarDeTrabajoConsulta + nacionalidadConsulta);
            } else {
                let respuestaCrearDoctor;
                const doctorEditado = {
                    id: Number(parametrosRuta.id),
                    nombreCompleto: parametrosCuerpo.nombreCompleto,
                    especialidad: parametrosCuerpo.especialidad,
                    sueldo: parametrosCuerpo.sueldo,
                    lugarDeTrabajo: parametrosCuerpo.lugarDeTrabajo,
                    nacionalidad: parametrosCuerpo.nacionalidad,
                } as DoctorEntity;
                try {
                    respuestaCrearDoctor = await this._doctorService.editarUno(doctorEditado);
                    return res.redirect('/doctor/vista/inicio')
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'Error editando doctor, los campos ingresados no son correctos'
                    return res.redirect('/doctor/vista/editar/' + id + '?error=' + mensajeError);
                }
                return res.redirect('/doctor/vista/inicio')
            }
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error validando'
            return res.redirect('/doctor/vista/editar/' + id + '?error=' + mensajeError);
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res,
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._doctorService.eliminarUno(id);
            return res.redirect('/doctor/vista/inicio?error=Doctor eliminado');
        } catch (error) {
            console.log(error);
            return res.redirect('/doctor/vista/inicio?error=Error eliminando doctor')
        }
    }
}