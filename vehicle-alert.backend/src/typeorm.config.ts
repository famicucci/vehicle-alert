import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Colors } from './colors/colors.entity';
import { Brands } from './brands/brands.entity';
import { VehicleStatus } from './vehicle-status/vehicle-status.entity';
import { Vehicles } from './vehicles/vehicles.entity';

const config: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Colors, Brands, VehicleStatus, Vehicles],
  synchronize: true, // Auto-creates tables in dev, turn off in production!
};

export default config;
