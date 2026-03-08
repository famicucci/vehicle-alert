import { Brands } from '../brands/brands.entity';
import { Colors } from '../colors/colors.entity';
import { VehicleStatus } from '../vehicle-status/vehicle-status.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  plateNumber: string;

  @Column({ nullable: false })
  brandId: number;
  @ManyToOne(() => Brands, { nullable: false })
  @JoinColumn({ name: 'brandId' })
  brand: Brands;

  @Column({ nullable: false })
  colorId: number;
  @ManyToOne(() => Colors, { nullable: false })
  @JoinColumn({ name: 'colorId' })
  color: Colors;

  @Column({ nullable: false })
  statusId: number;
  @ManyToOne(() => VehicleStatus, { nullable: false })
  @JoinColumn({ name: 'statusId' })
  status: VehicleStatus;
}
