import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movies.entity';

@Controller('movies') //라우팅 경로
export class MoviesController {
  // return 시 res.status().json() 이런 거 안 붙여 줘도 알아서 해줌
  // 생성자 매개변수에 Service 클래스를 보내주는 방식으로 Controller와 Service 연결
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/search')
  search(@Query('name') name: string) {
    return `this is searching movie that name is ${name}`;
  }
  // 파라미터 데이터를 사용 하려면 @Param 데코레이터로 요청 해야함
  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }
  // Body 데이터를 사용하려면 @Body 데코레이터로 요청 해야함
  @Post()
  create(@Body() data) {
    return this.moviesService.create(data);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.updateMovie(movieId, updateData);
  }
}