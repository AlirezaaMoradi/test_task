// Imports
import { Entity, Column } from "typeorm";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { City } from "../cities/cities.entity";

// Models
@Entity('districts')
export class District {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @ManyToOne(() => City, (city) => city.districts, { onDelete: 'CASCADE'})
  city: City;

  @CreateDateColumn({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  created_at: Date;

  @UpdateDateColumn({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', 
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;
}