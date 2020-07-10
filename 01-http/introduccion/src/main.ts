import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module'; //importar cosas en ts
const cookieParser = require('cookie-parser'); //importar cosas en js

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /*
    Configuracion antes de app.listen
     */
    app.use(cookieParser());
    await app.listen(3001);
}

bootstrap();
