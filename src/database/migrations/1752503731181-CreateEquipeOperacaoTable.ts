import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEquipeOperacaoTable1752503731181
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipe',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'email', type: 'varchar', length: '60' },
          { name: 'contato_equipe', type: 'varchar', length: '13' },
          { name: 'data_operacao', type: 'date' },
          { name: 'horario_inicial', type: 'varchar', length: '10' },
          { name: 'horario_final', type: 'varchar', length: '10' },
          { name: 'nome_operacao', type: 'varchar', length: '80' },
          { name: 'posto_comandante', type: 'varchar', length: '20' },
          { name: 'nome_guerra_comandante', type: 'varchar', length: '60' },
          { name: 'matricula_comandante', type: 'varchar', length: '12' },
          { name: 'opm_guarnicao', type: 'varchar', length: '30' },
          { name: 'prefixo_vtr', type: 'varchar', length: '20' },
          { name: 'efetivo_policial', type: 'int' },
          { name: 'atividade_realizada', type: 'varchar', length: '40' },
          { name: 'local_atividade', type: 'varchar', length: '40' },
          { name: 'area_atuacao', type: 'varchar', length: '50' },
          { name: 'tipo_servico', type: 'varchar', length: '30' },
          { name: 'numero_ht', type: 'varchar', length: '30' },
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
    await queryRunner.dropTable('equipe');
  }
}
