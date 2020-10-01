import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module'; //importar cosas en ts
const cookieParser = require('cookie-parser'); //importar cosas en js
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule) as any;

    /*
    Configuracion antes de app.listen
     */
    app.use(cookieParser('Firma de Paul'));
    app.set('view engine', 'ejs')
    app.use(express.static('publico'));
    app.use(
        session({
            name: 'server-session-id',
            secret: 'No sera de tomar un traguito',
            resave: true,
            saveUninitialized: true,
            cookie: {secure: false},
            store: new FileStore(),
        }),
    );


    await app.listen(3001);
}

bootstrap();
