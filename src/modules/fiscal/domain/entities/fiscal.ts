import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostoComandante } from 'src/modules/equipe/domain/enums/posto-comandante.enum';
import { Relatorio } from '../../../relatorio/domain/entities/relatorio';

@Entity('fiscais')
export class Fiscal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'posto_graduacao',
    nullable: false,
    length: 30,
  })
  postoGraduação: PostoComandante;

  @Column({ nullable: false, length: 40 })
  nome: string;

  @Column({ nullable: false, length: 40 })
  matricula: string;

  @Column({ nullable: false, length: 40 })
  opm: string;

  @OneToMany(() => Relatorio, (relatorio) => relatorio.fiscal, {
    eager: false,
  })
  relatorios: Relatorio[];
}
