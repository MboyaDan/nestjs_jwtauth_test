import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

it('should signup a user', async () => {
  const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({
      email: `test${Date.now()}@test.com`, // unique per test run
      password: 'password123',
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('access_token');
});
});
