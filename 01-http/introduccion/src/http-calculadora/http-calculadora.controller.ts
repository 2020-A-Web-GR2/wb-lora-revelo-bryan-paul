import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from "@nestjs/common";
import {UsuarioCreateDTO} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";

@Controller('calculadora-http')

export class HttpCalculadoraController {
    @Get('sumar/:n2')
    @HttpCode(200)
    sumar(
        @Param() parametrosRuta,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {
        if (isNaN(parametrosDeConsulta.n1) || isNaN(parametrosRuta.n2)) {
            throw new BadRequestException('N1 y N2 deben ser numeros');
        } else {
            if (req.cookies.nombreDeUsuario) {

                const numero1 = Number(parametrosDeConsulta.n1);
                const numero2 = Number(parametrosRuta.n2);
                const resultado = numero1 + numero2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado);

                if (puntaje <= 0) {
                    res.cookie(
                        'puntaje',
                        100,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' + ' + numero2 + ' = ' + resultado,
                        puntaje: req.cookies.nombreDeUsuario + ' haz terminado tus puntos, se te han restablecido de nuevo'
                    };
                    res.send(mensaje);
                } else {
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' + ' + numero2 + ' = ' + resultado,
                        puntaje: puntaje
                    };
                    res.send(mensaje);
                }
            } else {
                throw new BadRequestException('No existe un usuario');
            }
        }
    }

    @Put('restar')
    @HttpCode(201)
    restar(
        @Body() parametrosDeCuerpo,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {
        if (isNaN(parametrosDeCuerpo.n1) || isNaN(parametrosDeConsulta.n2)) {
            throw new BadRequestException('N1 y N2 deben ser numeros');
        } else {
            if (req.cookies.nombreDeUsuario) {

                const numero1 = Number(parametrosDeCuerpo.n1);
                const numero2 = Number(parametrosDeConsulta.n2);
                const resultado = numero1 - numero2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado);

                if (puntaje <= 0) {
                    res.cookie(
                        'puntaje',
                        100,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' - ' + numero2 + ' = ' + resultado,
                        puntaje: req.cookies.nombreDeUsuario + ' haz terminado tus puntos, se te han restablecido de nuevo'
                    };
                    res.send(mensaje);
                } else {
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' - ' + numero2 + ' = ' + resultado,
                        puntaje: puntaje
                    };
                    res.send(mensaje);
                }
            } else {
                throw new BadRequestException('No existe un usuario');
            }
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    multiplicar(
        @Headers() cabecera,
        @Req() req,
        @Res() res
    ) {
        if (isNaN(cabecera.n1) || isNaN(cabecera.n2)) {
            throw new BadRequestException('N1 y N2 deben ser numeros');
        } else {
            if (req.cookies.nombreDeUsuario) {
                const numero1 = Number(cabecera.n1);
                const numero2 = Number(cabecera.n2);
                const resultado = numero1 * numero2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado);
                if (puntaje <= 0) {
                    res.cookie(
                        'puntaje',
                        100,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' * ' + numero2 + ' = ' + resultado,
                        puntaje: req.cookies.nombreDeUsuario + ' haz terminado tus puntos, se te han restablecido de nuevo'
                    };
                    res.send(mensaje);
                } else {
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' * ' + numero2 + ' = ' + resultado,
                        puntaje: puntaje
                    };
                    res.send(mensaje);
                }
            } else {
                throw new BadRequestException('No existe un usuario');
            }
        }
    }

    @Post('dividir/:n1/:n2')
    @HttpCode(201)
    dividir(
        @Param() parametrosRuta,
        @Req() req,
        @Res() res
    ) {
        if (isNaN(parametrosRuta.n1) || isNaN(parametrosRuta.n2)) {
            throw new BadRequestException('N1 y N2 deben ser numeros');
        } else if (parametrosRuta.n2 == 0) {
            throw new BadRequestException('N2 no debe ser cero');
        } else {
            if (req.cookies.nombreDeUsuario) {
                const numero1 = Number(parametrosRuta.n1);
                const numero2 = Number(parametrosRuta.n2);
                const resultado = numero1 / numero2;
                const puntaje = req.signedCookies.puntaje - Math.abs(resultado);
                if (puntaje <= 0) {
                    res.cookie(
                        'puntaje',
                        100,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' / ' + numero2 + ' = ' + resultado,
                        puntaje: req.cookies.nombreDeUsuario + ' haz terminado tus puntos, se te han restablecido de nuevo'
                    };
                    res.send(mensaje);
                } else {
                    res.cookie(
                        'puntaje',
                        puntaje,
                        {signed: true}
                    );
                    const mensaje = {
                        operacion: numero1 + ' / ' + numero2 + ' = ' + resultado,
                        puntaje: puntaje
                    };
                    res.send(mensaje);
                }
            } else {
                throw new BadRequestException('No existe un usuario');
            }
        }
    }

    @Get('guardarUsuarioYPuntaje')
    async guardarNombreYPuntaje(
        @Query() parametrosDeConsulta,
        @Res() res
    ) {
        const usuarioValido = new UsuarioCreateDTO();
        usuarioValido.nombreDeUsuario = parametrosDeConsulta.nombre;

        try {
            const errores: ValidationError[] = await validate(usuarioValido);
            if (errores.length > 0) {
                console.log('Error', errores);
                throw new BadRequestException('Error de validacion');
            } else {
                res.cookie(
                    'nombreDeUsuario', //nombre
                    usuarioValido.nombreDeUsuario, //valor
                );
                res.cookie(
                    'puntaje',
                    100,
                    {signed: true}
                );
                const mensaje = {
                    mensaje: 'Usuario y puntaje guardado'
                };
                res.send(mensaje);
            }
        } catch (e) {
            console.log('Error', e);
            throw new BadRequestException('Error de validacion')
        }
    }
}