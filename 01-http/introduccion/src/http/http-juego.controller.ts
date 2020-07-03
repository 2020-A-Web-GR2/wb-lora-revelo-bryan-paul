import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

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
}