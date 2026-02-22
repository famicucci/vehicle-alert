import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestCases } from '../test-cases/test-cases.entity';

@Entity()
export class Tests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketId: string;

  @Column()
  result: string;

  @Column()
  date: Date;

  @Column()
  version: string;

  @Column()
  observations: string;

  @ManyToOne(() => TestCases, { nullable: false })
  @JoinColumn({ name: 'testCaseId' })
  testCase: TestCases;
}
