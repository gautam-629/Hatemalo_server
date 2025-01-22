// src/infrastructure/database/pgSql/data-source.ts
import { DataSource } from 'typeorm';
import { Config } from '../../../config';
import { User } from './entity/User.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: Config.DB_HOST,
  port: Number(Config.DB_PORT),
  username: Config.DB_USERNAME,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  synchronize:true,
  // synchronize: Config.NODE_ENV == 'test',
  logging: false,
  // Use direct entity reference instead of path
  entities: [User],
  migrations: ['src/infrastructure/database/pgSql/migration/*.{ts,js}'],
  subscribers: [],
});

export { AppDataSource };
