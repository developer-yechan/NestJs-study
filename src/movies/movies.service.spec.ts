import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('result should be array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('result should be defined', () => {
      service.create({
        title: 'test',
        year: 2008,
        genres: ['test'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
    });
    it('result should throw NotFoundException', () => {
      try {
        const result = service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('afterDelete length should be lower than beforeDelete', () => {
      service.create({
        title: 'test',
        year: 2008,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('not Exist movie delete error', () => {
      try {
        service.deleteOne(23);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create one', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test',
        year: 2008,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });

    it('created movie title', () => {
      service.create({
        title: 'test',
        year: 2008,
        genres: ['test'],
      });
      const created = service.getOne(1);
      const title = created.title;
      expect(title).toMatch('test');
    });
  });

  describe('update', () => {
    it('update one', () => {
      service.create({
        title: 'test',
        year: 2008,
        genres: ['test'],
      });
      service.updateMovie(1, {
        title: 'update',
        year: 2009,
      });
      const afterUpdate = service.getOne(1);
      expect(afterUpdate.title).toMatch('update');
      expect(afterUpdate.year).toEqual(2009);
    });

    it('not Exist movie update error', () => {
      try {
        service.updateMovie(23, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
