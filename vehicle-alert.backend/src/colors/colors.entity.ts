import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Colors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  code: string;
}
