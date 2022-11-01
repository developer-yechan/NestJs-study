import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  //beforeEach는 각 테스트 할 때마다 db가 초기화 되므로 beforeAll로 변경
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //실제 어플리케이션과 똑같은 환경을 만들어 주기 위해 Pipe 추가
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });
  describe('/movies', () => {
    it('(GET) 200', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('(POST) 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2008,
          genres: ['test'],
        })
        .expect(201)
        .expect({
          id: 1,
          title: 'test',
          year: 2008,
          genres: ['test'],
        });
    });

    it('(Post) 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 1,
          year: 2008,
          genres: ['test', 2],
        })
        .expect(400);
    });
  });

  describe('/movies:id', () => {
    it('(GET) 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect({
          id: 1,
          title: 'test',
          year: 2008,
          genres: ['test'],
        });
    });

    it('(GET) 404 error', () => {
      return request(app.getHttpServer()).get('/movies/99').expect(404);
    });

    it('(UPDATE) 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'UP',
          year: 2008,
          genres: ['test'],
        })
        .expect(200);
    });

    it('(DELETE) 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('(UPDATE) 404 error', () => {
      return request(app.getHttpServer()).patch('/movies/99').expect(404);
    });

    it('DELETE) 404 error', () => {
      return request(app.getHttpServer()).delete('/movies/99').expect(404);
    });
  });
});
