import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Relatorio } from './relatorio';

@Entity('melhorias-identificadas')
export class MelhoriaIdentificada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.melhoriasIdentificadas, {
    eager: false,
  })
  @JoinColumn({ name: 'relatorio_id' })
  relatorio: Relatorio;
}
