import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  rua: string;

  @Column({ length: 20 })
  numero: string;

  @Column({ length: 80 })
  bairro: string;

  @Column({ length: 80 })
  cidade: string;

  @Column({ name: 'uf', length: 3 })
  uf: string;

  @Column({ length: 20 })
  cep: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  complemento: string | null;
}
