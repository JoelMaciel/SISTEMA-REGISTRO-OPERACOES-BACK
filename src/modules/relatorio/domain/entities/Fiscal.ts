import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostoComandante } from 'src/modules/equipe/domain/enums/posto-comandante.enum';

@Entity('fiscais')
export class Fiscal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 40 })
  postoGraduação: PostoComandante;

  @Column({ nullable: false, length: 40 })
  nome: string;

  @Column({ nullable: false, length: 40 })
  matricula: string;

  @Column({ nullable: false, length: 40 })
  opm: string;

  // @ManyToOne(() => Veiculo, (veiculo) => veiculo.relatorio, {
  //   eager: false,
  // })
  // @JoinColumn({ name: 'veiculo_id' })
  // veiculo: Veiculo;
}
