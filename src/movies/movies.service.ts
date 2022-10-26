import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movies.entity';
import { CreateMovieDto } from 'src/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/dto/updateMovie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(movieId: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +movieId);
    if (!movie) {
      // NestJs에서 제공하는 예외처리
      throw new NotFoundException(`Movie with Id ${movieId} not found`);
    }
    return movie;
  }
  deleteOne(movieId: string): boolean {
    this.getOne(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== +movieId);
    return true;
  }
  create(movieData: CreateMovieDto): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies[this.movies.length - 1];
  }

  updateMovie(movieId: string, movieData: UpdateMovieDto) {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.movies.push({ ...movie, ...movieData });
  }
}
