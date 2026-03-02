import { Brands } from '../brands/brands.entity';
import { Colors } from '../colors/colors.entity';
import { VehicleStatus } from '../vehicle-status/vehicle-status.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @ManyToOne(() => Brands, (brand) => brand.id)
  brand: Brands;

  @ManyToOne(() => Colors, (color) => color.id)
  color: Colors;

  @ManyToOne(() => VehicleStatus, (status) => status.id)
  status: VehicleStatus;
}
