import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEquipeOperacaoTable1752503731181
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipe_operacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'contato_equipe',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'data_operacao',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'horario_inicial',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'horario_final',
            type: 'varchar',
            length: '5',
            isNullable: false,
          },
          {
            name: 'nome_operacao',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'posto_comandante',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'nome_guerra_comandante',
            type: 'varchar',
            length: '60',
            isNullable: false,
          },
          {
            name: 'matricula_comandante',
            type: 'varchar',
            length: '12',
            isNullable: false,
          },
          {
            name: 'opm_guarnicao',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'prefixo_vtr',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'efetivo_policial',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'atividade_realizada',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'local_atividade',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'area_atuacao',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'tipo_servico',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'numero_ht',
            type: 'varchar',
            length: '30',
            isNullable: false,
          },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipes_operacao');
  }
}
