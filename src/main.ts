import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

//Propio
import { AppModule } from './app/app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('GATEWAY-MAIN');
  console.log(envs);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.PORT);
  logger.debug(`👍Server up => PORT => ${envs.PORT} 👍💪👍💪👍💪`);
}
void bootstrap();
