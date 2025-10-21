// Imports
import { Entity, Column } from "typeorm";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OneToMany } from 'typeorm';

import { District } from '../districts/districts.entity';

// Models
@Entity('city')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 225
  })
  name: string;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
