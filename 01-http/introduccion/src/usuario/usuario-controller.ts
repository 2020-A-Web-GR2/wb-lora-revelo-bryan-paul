import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario-service";
import {MascotaService} from "../mascota/mascota-service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')

export class UsuarioController {
    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Paul'
        },
        {
            id: 2,
            nombre: 'Bryan'
        },
        {
            id: 3,
            nombre: 'Lalo'
        }
    ];
    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService,
    ) {

    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

        //return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() parametrosDeCuerpo
    ) {
        try {
            //Validar con CREATE DTO
            const usuarioValido = new UsuarioCreateDto();
            usuarioValido.nombre = parametrosDeCuerpo.nombre;
            usuarioValido.apellido = parametrosDeCuerpo.apellido;
            usuarioValido.cedula = parametrosDeCuerpo.cedula;
            usuarioValido.sueldo = parametrosDeCuerpo.sueldo;
            usuarioValido.fechaNacimiento = parametrosDeCuerpo.fechaNacimiento;
            usuarioValido.fechaHoraNacimiento = parametrosDeCuerpo.fechaHoraNacimiento;

            const errores: ValidationError[] = await validate(usuarioValido);
            if (errores.length > 0) {
                console.log('Error', errores);
                throw new BadRequestException('Error de validacion');
            } else {
                const respuesta = await this._usuarioService.crearUno(parametrosDeCuerpo);
                return respuesta;
            }

            // const respuesta = await this._usuarioService.crearUno(parametrosDeCuerpo);
            // return respuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            })
        }

        // const nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosDeCuerpo.nombre
        // }
        // this.arregloUsuarios.push(nuevoUsuario);
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: 'No existen registros'
            })
        }

        // const indice = this.arregloUsuarios.findIndex((usuario) => usuario.id === Number(parametrosRuta.id));
        // return this.arregloUsuarios[indice];
    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosDeCuerpo
    ) {
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosDeCuerpo;
        usuarioEditado.id = id;

        try {
            const respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }

        // const indice = this.arregloUsuarios.findIndex((usuario) => usuario.id === Number(parametrosRuta.id));
        // this.arregloUsuarios[indice].nombre = parametrosDeCuerpo.nombre;
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ) {
        try {
            const id = Number(parametrosRuta.id);
            const respuesta = await this._usuarioService.eliminarUno(id);
            return {
                mensaje: 'Registro con id: ' + id + ' eliminado'
            };
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }


        // const indice = this.arregloUsuarios.findIndex((usuario) => usuario.id === Number(parametrosRuta.id));
        // this.arregloUsuarios.splice(indice,1);
        // return this.arregloUsuarios;
    }

    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosDeCuerpo
    ) {
        const usuario = parametrosDeCuerpo.usuario;
        const mascota = parametrosDeCuerpo.mascota;

        //validar usuario
        //Vaidar macsota
        //crear los dos

        let usuarioCreado;
        try {
            //Validar con CREATE DTO
            usuarioCreado = await this._usuarioService.crearUno(usuario);

        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario'
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                //Validar con CREATE DTO
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);

            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota'
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota'
            })
        }
    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ) {
        const nombreControlador = 'Paul';
        return res.render(
            'usuario/ejemplo',//Nombre de la vista (archivo)
            {
                nombre: nombreControlador,
            }
        )
    }

    @Get('vista/faq')
    faq(
        @Res() res
    ) {
        return res.render(
            'usuario/faq',//Nombre de la vista (archivo)
        )
    }

    @Get('vista/inicio')
    async inicio(
        @Res() res,
        @Query() parametrosDeConsulta,
    ) {
        let usuariosEncontrados
        try {
            usuariosEncontrados = await this._usuarioService.buscarTodos(parametrosDeConsulta.busqueda);
        } catch {
            throw new InternalServerErrorException('Error encontrando usuarios');
        }
        if (usuariosEncontrados) {
            return res.render(
                'usuario/inicio',//Nombre de la vista (archivo)
                {
                    arregloUsuarios: usuariosEncontrados,
                    parametrosDeConsulta: parametrosDeConsulta
                }
            );
        } else {
            throw new NotFoundException('No se encontraron usuarios');
        }

    }

    @Get('vista/login')
    login(
        @Res() res
    ) {
        return res.render(
            'usuario/login',//Nombre de la vista (archivo)
        )
    }

    @Get('vista/crear') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }

    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const id = Number(parametrosRuta.id);
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado,
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
    }

    /*@Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosDeCuerpo,
        @Res() res,
    ){
        //Validar los datos con DTO
        let respuestaCrearUsuario;
        const usuarioValido = new UsuarioCreateDto();
        usuarioValido.nombre = parametrosDeCuerpo.nombre;
        usuarioValido.apellido = parametrosDeCuerpo.apellido;
        usuarioValido.cedula = parametrosDeCuerpo.cedula;
        usuarioValido.sueldo = parametrosDeCuerpo.sueldo;
        usuarioValido.fechaNacimiento = parametrosDeCuerpo.fechaNacimiento;
        usuarioValido.fechaHoraNacimiento = parametrosDeCuerpo.fechaHoraNacimiento;
        try{
            const errores: ValidationError[] = await validate(usuarioValido);
            if (errores.length > 0) {
                console.log('Error', errores);
                const mensajeError = 'Error de validacion'
                return res.redirect('/usuario/vista/crear?error=    '+mensajeError);
            } else {
                const respuestaCrearUsuario = await this._usuarioService.crearUno(parametrosDeCuerpo);
                return respuestaCrearUsuario;
            }
        }catch(error){
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error='+mensajeError);
        }
        if(respuestaCrearUsuario){
            return res.redirect('/usuario/vista/inicio');
        }else{
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error='+mensajeError);
        }
    }*/

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta,
        @Res() res,
    ) {
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try{
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res,
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id);
            return res.redirect('/usuario/vista/inicio?mensaje=usuario eliminado');
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }
}
