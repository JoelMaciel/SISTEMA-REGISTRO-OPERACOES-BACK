import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';
import { SituacaoVeiculo } from '../enums/SituacaoVeiculo';

@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  marca: string;

  @Column()
  tipo: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column({ name: 'situacao', type: 'enum', enum: SituacaoVeiculo })
  situacao: SituacaoVeiculo;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.veiculos)
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
