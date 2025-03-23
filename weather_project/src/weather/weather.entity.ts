import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Location } from '../location/location.entity';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Location, (location) => location.weather, {
    onDelete: 'CASCADE',
  })
  location: Location;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;

  @Column('float')
  wind_speed: number;

  @Column({ type: 'varchar', length: 50 })
  weather_main: string;

  @Column({ type: 'varchar', length: 100 })
  weather_desc: string;

  @CreateDateColumn()
  recorded_at: Date;
}
