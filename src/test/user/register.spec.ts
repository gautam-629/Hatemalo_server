import "reflect-metadata";
import app from '../../app';
import request from 'supertest';
import { AppDataSource } from '../../infrastructure/database/pgSql/data-source';
import { User } from '../../infrastructure/database/pgSql/entity/User';

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

 describe('Given all fields',()=>{
      it('should return 201 status code',async()=>{

        // Arrange
          const userData={
             email:"example@gmail.com",
             password:"secret@123",
             role:'user'
          }

          //act
        const response= await request(app).post('/api/v1/auth/register').send(userData)

        //Assert
        expect(response.statusCode).toBe(201)
      })
 })
});
