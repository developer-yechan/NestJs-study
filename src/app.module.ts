import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { MoviesService } from './movies/movies.service';
import { AppController } from './app/app.controller';

// decorator
//클래스에 함수 기능 추가할 수 있다.
// @Module() @Get() ...
// 주의 할 것 : 클래스와 decorator는 붙어 있어야 한다.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
