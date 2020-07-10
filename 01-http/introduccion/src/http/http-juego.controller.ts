import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req,
    Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

// prefijo es como el nombre o el area a quien pertenece
// http://localhost:3001/juegos-http
@Controller('juegos-http')


export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)
    //el modificador de acceso por defento en typescript es public
    holaGet() {
        throw new BadRequestException('No envia Nada')

        //return 'Hola GET!';
    }

    @Post('hola')
    @HttpCode(202)
    //el modificador de acceso por defento en typescript es public
    holaPost() {
        return 'Hola POST!';
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-Controller', 'none')
    @Header('EPN', 'probando las cosas')
    //el modificador de acceso por defento en typescript es public
    holaDelete() {
        return 'Hola Delete!';
    }

    //parametros de ruta
    //http://localhost:3001/juegos-http/parametros-ruta/xx/gestion/yy
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemeplo(
        @Param() parametrosRuta
    ) {
        if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)) {
            throw new BadRequestException('La edad o la altura no son numeros');
        } else {
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad + altura;
        }

        console.log('parametros', parametrosRuta);
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {
        const tieneNombreYApellido = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if (tieneNombreYApellido) {
            return parametrosDeConsulta.nombre + ' ' + parametrosDeConsulta.apellido;
        } else {
            console.log('asd');
            return '>(';
        }

    }

    @Post('parametros-cuerpo')
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.log('Error', errores);
                throw new BadRequestException('Error de validacion');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                console.log('Se creo correctamente');
                return mensajeCorrecto;

            }
        } catch (e) {
            console.log('Error', e);
            throw new BadRequestException('Error de validacion')
        }
    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {
        res.cookie(
            'galletaInsergura', //nombre
            'tengo hambre', //valor
        );
        const mensaje = {
            mensaje: 'ok'
        };
//return mensaje;// no se puede usar return cuando se usa @Res()!
        res.send(mensaje);
    }
}