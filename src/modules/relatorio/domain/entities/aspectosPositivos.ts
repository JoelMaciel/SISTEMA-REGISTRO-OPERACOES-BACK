import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Relatorio } from './relatorio';

@Entity('aspectos-positivos')
export class AspectoPositivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.aspectosPositivos, {
    eager: false,
  })
  @JoinColumn({ name: 'relatorio_id' })
  relatorio: Relatorio;
}
