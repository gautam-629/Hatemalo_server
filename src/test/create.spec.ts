import "reflect-metadata";
import app from '../app';
import request from 'supertest';
import { AppDataSource } from '../infrastructure/database/pgSql/data-source';
import { User } from '../infrastructure/database/pgSql/entity/User';

describe('POST /user', () => {
  
  // Initialize database connection before running tests
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  // Clean the database before each test to ensure isolation
  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  // Close the database connection after tests
  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should return 201 status code with valid user data', async () => {
    const userData = {
      role: 'user',
      email: 'gautambinod629@gmail.com',
      password: 'secret5555555555555',
    };

    const response = await request(app).post('/api/v1/create').send(userData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.email).toBe(userData.email); // Check if the created user data is returned
  });
});
