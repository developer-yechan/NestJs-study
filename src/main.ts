import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//함수명은 수정해도 됨
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
