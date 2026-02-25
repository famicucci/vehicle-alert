import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TestCases } from './test-cases/test-cases.entity';
import { Colors } from './colors/colors.entity';

const config: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [TestCases, Colors],
  synchronize: true, // Auto-creates tables in dev, turn off in production!
};

export default config;
