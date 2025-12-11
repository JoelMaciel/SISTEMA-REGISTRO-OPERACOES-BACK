import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Relatorio } from './relatorio';

@Entity('aspectos- positivoa')
export class AspectoPositivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  descricao: Text;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.relatorio, {
    eager: false,
  })
  @JoinColumn({ name: 'veiculo_id' })
  realtorio: Relatorio;
}
