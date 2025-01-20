import "reflect-metadata";
import app from '../../app';
import request from 'supertest';
import { AppDataSource } from '../../infrastructure/database/pgSql/data-source';
import { User } from '../../infrastructure/database/pgSql/entity/User';
import { DataSource } from "typeorm";
import { response } from "express";

describe('POST /user', () => {
  let connection: DataSource;

  // Initialize database connection before running tests
  beforeAll(async () => {
    connection = await AppDataSource.initialize();
});

  // Clean the database before each test to ensure isolation
  beforeEach(async () => {
    await connection.dropDatabase();
        await connection.synchronize();
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
      it('should return valid json response',async()=>{

        // Arrange
          const userData={
             email:"example@gmail.com",
             password:"secret@123",
             role:'user'
          }

          //act
        const response= await request(app).post('/api/v1/auth/register').send(userData)

        //Assert
        expect(response.header['content-type']).toEqual(expect.stringContaining('json'))
      })
      it('should persist the user in the database',async()=>{

        // Arrange
          const userData={
             email:"example@gmail.com",
             password:"secret@123",
             role:'user'
          }

          //act
        await request(app).post('/api/v1/auth/register').send(userData)

        //Assert
        const userRepository=connection.getRepository(User)
        const users=await userRepository.find()
        expect(users).toHaveLength(1);
        expect(users[0].email).toBe(userData.email)
      })
      it('should return and id of the created user',async()=>{

        // Arrange
          const userData={
             email:"example@gmail.com",
             password:"secret@123",
             role:'user'
          }

          //act
       const response= await request(app).post('/api/v1/auth/register').send(userData)

        //Assert
        expect(response.body).toHaveProperty("data.id")
        const userRepository=connection.getRepository(User)
        const users= await userRepository.find()
        expect(response.body.data.id as Record<string,string>).toBe(users[0].id)
      })
      it('should should  return 409 status code if the email is already exits',async()=>{

        // Arrange
          const userData={
             email:"example@gmail.com",
             password:"secret@123",
          }
          const userRepository=connection.getRepository(User)
          await userRepository.save(userData)
          //act
         const response= await request(app).post('/api/v1/auth/register').send(userData)

        //Assert
          const user= await userRepository.find()
          expect(response.statusCode).toBe(409);
          expect(user).toHaveLength(1)
        
      })
      it('should store hash password in the database', async () => {
        // Arrange
        const userData = {
          email: "example@gmail.com",
          password: "secret@123",
        };
        
        const userRepository = connection.getRepository(User);
      
        // Act
        await request(app).post('/api/v1/auth/register').send(userData);
      
        // Assert
        const users = await userRepository.find({ select: ['password'] });
        expect(users[0].password).not.toBe(userData.password); 
        expect(users[0].password).toHaveLength(60); 
        expect(users[0].password).toMatch(/^\$2[aby]\$\d{2}\$.{53}$/); 
      });
      
 })
});
