import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  Configuracion antes de app.listen
   */
  await app.listen(3001);
}
bootstrap();
