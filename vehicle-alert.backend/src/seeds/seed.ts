// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../app.module';
// import { ColorsService } from 'src/colors/colors.service';

// const colorsMocks = [
//   { name: 'Red', hex: '#FF0000' },
//   { name: 'Green', hex: '#00FF00' },
//   { name: 'Blue', hex: '#0000FF' },
// ];

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const colorsService = app.get(ColorsService);

//   await Promise.all(colorsMocks.map((q) => colorsService.createColor(q)));

//   await app.close();
// }

// bootstrap();
