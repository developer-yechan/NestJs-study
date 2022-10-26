import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  //NestJs가 MoviesService를 import하고 MoviesController에 주입 --> dependency injection
  providers: [MoviesService],
})
export class MoviesModule {}
