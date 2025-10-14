import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Endereco } from './Endereco';
import { Arma } from './arma';
import { Vitima } from './vitima';
import { Acusado } from './acusado';
import { Droga } from './droga';
import { Municao } from './municao';
import { Veiculo } from './veiculo';
import { OutroObjeto } from './outroObjeto';
import { Dinheiro } from './dinheiro';

@Entity('ocorrencias')
export class Ocorrencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'm_ocorrencia', type: 'varchar' })
  m: string;

  @Column()
  data: Date;

  @Column({ name: 'horario_inicial' })
  horario: string;

  @Column({ name: 'tipo_ocorrencia', length: 100 })
  tipo: string;

  @Column({ name: 'resumo', type: 'text', nullable: false })
  resumo: string;

  @OneToMany(() => Vitima, (vitima) => vitima.ocorrencia, {
    cascade: true,
  })
  vitimas: Vitima[];

  @OneToMany(() => Acusado, (acusado) => acusado.ocorrencia, {
    cascade: true,
  })
  acusados: Acusado[];

  @OneToMany(() => Droga, (droga) => droga.ocorrencia, {
    cascade: true,
  })
  drogas: Droga[];

  @OneToMany(() => Municao, (municao) => municao.ocorrencia, {
    cascade: true,
  })
  municoes: Municao[];

  @OneToMany(() => Veiculo, (veiculo) => veiculo.ocorrencia, {
    cascade: true,
  })
  veiculos: Veiculo[];

  @OneToMany(() => Arma, (arma) => arma.ocorrencia, {
    cascade: true,
  })
  armas: Arma[];

  @OneToMany(() => OutroObjeto, (objeto) => objeto.ocorrencia, {
    cascade: true,
  })
  outrosObjetos: OutroObjeto[];

  @OneToMany(() => Dinheiro, (dinheiro) => dinheiro.ocorrencia, {
    cascade: true,
  })
  valoresApreendidos: Dinheiro[];

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  updatedAt: Date;
}
