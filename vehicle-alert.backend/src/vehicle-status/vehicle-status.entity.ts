import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehicleStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
