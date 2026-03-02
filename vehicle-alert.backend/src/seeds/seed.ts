import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ColorsService } from '../colors/colors.service';
import { BrandsService } from '../brands/brands.service';

const colorsMocks = [
  { name: 'Rojo', code: '#FF0000' },
  { name: 'Verde', code: '#00FF00' },
  { name: 'Azul', code: '#0000FF' },
  { name: 'Amarillo', code: '#FFFF00' },
  { name: 'Negro', code: '#000000' },
  { name: 'Blanco', code: '#FFFFFF' },
  { name: 'Gris', code: '#A9A9A9' },
  { name: 'Gris Oscuro', code: '#808080' },
  { name: 'Marrón', code: '#A52A2A' },
  { name: 'Naranja', code: '#FFA500' },
];

const brandsMocks = [
  { name: 'Toyota' },
  { name: 'Peugeot' },
  { name: 'Ford' },
  { name: 'Volkswagen' },
  { name: 'Chevrolet' },
  { name: 'Fiat' },
  { name: 'Renault' },
  { name: 'Citroën' },
  { name: 'Honda' },
  { name: 'Nissan' },
  { name: 'BMW' },
  { name: 'Mercedes-Benz' },
  { name: 'Audi' },
  { name: 'Suzuki' },
  { name: 'Mitsubishi' },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const colorsService = app.get(ColorsService);
  const brandsService = app.get(BrandsService);

  await Promise.all(colorsMocks.map((q) => colorsService.createColor(q)));
  await Promise.all(brandsMocks.map((q) => brandsService.createBrand(q)));

  await app.close();
}

bootstrap();
