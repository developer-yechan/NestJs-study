import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './createMovie.dto';
//UpdateMovieDto가 CreateMovieDto의 타입을 부분적으로 상속하게 하고 싶을 때 쓰는 PartialType
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
