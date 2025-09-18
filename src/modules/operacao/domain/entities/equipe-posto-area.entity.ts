import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { PostoArea } from './posto-area';
import { Equipe } from 'src/modules/equipe/domain/entities/equipe';

@Entity('equipe_posto_area')
export class EquipePostoArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipe, (equipe) => equipe.equipePostoArea, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'equipe_id' })
  equipe: Equipe;

  @ManyToOne(() => PostoArea, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'posto_area_id' })
  postoArea: PostoArea;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
