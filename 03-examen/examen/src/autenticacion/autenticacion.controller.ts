import {Body, Controller, Get, Post, Query, Req, Res, Session} from "@nestjs/common";
import {UsuarioDtoCreate} from "../usuario/usuario-dto/usuario-dto.create";
import {validate, ValidationError} from "class-validator";

@Controller('autenticacion')
export class AutenticacionController {

    @Get('/vista/login')
    login(
        @Res() res,
        @Query() parametrosConsulta,
    ) {
        return res.render(
            'login/login',
            {
                error: parametrosConsulta.error,
            }
        );
    }

    @Post('login')
    async loginPost(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session,
    ) {
        // validamos datos
        const usuarioValido = new UsuarioDtoCreate;

        usuarioValido.usuario = parametrosCuerpo.usuario;
        usuarioValido.password = parametrosCuerpo.password;

        try {
            const errores: ValidationError[] = await validate(usuarioValido);
            if (errores.length > 0) {
                console.log(errores)
                return res.redirect('/autenticacion/vista/login?error=Datos incorrectos')
            } else {
                console.log(usuarioValido.usuario);
                session.username = usuarioValido.usuario;
                session.roles = ['Administrador'];
                console.log('estaLogeado')
                return res.redirect('/doctor/vista/inicio/?error=Bienvenido administrador');
            }
        } catch (error) {
            return res.redirect('/autenticacion/vista/login?error=Datos incorrectos');
        }
    }

    @Get('protegido')
    protegido(
        @Res() response,
        @Session() session,
    ) {
        const estaLogeado = session.username;
        console.log(estaLogeado)
        if (estaLogeado) {
            return response.render(
                'login/protegido',
                {
                    usuario: session.username,
                    roles: session.roles
                }
            )
        } else {
            return response.redirect('/login')
        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Res() res,
        @Req() req,
    ) {
        session.username = undefined;
        session.roles = undefined;
        req.session.destroy();
        return res.redirect('/autenticacion/vista/login');
    }

}