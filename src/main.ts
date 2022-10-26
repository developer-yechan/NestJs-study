import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//함수명은 수정해도 됨
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //decorator가 붙지 않은 속성 제거
      whitelist: true,
      //decorator가 붙지 않은 속성이 요청에 포함되면 에러 return
      forbidNonWhitelisted: true,
      //dto에 정의된 타입의 형태로 파라미터의 타입을 변환
      // url로 받은 id 는 string인데 내가 정의한 함수에서 id가 number 타입이면 number로 알아서 변환해줌
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
