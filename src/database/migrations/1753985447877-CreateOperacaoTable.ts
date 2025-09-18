import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOperacaoTable1753985447877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '70' },
          { name: 'opm_demandante', type: 'varchar', length: '30' },
          { name: 'data_inicial', type: 'date' },
          { name: 'data_final', type: 'date' },
          { name: 'efetivo_policial', type: 'int' },
          { name: 'quantidade_posto_area', type: 'int' },
          { name: 'observacoes', type: 'text' },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'posto_area',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'nome', type: 'varchar', length: '120' },
          { name: 'local', type: 'varchar', length: '120' },
          { name: 'numero', type: 'varchar', length: '30', isNullable: true },
          { name: 'bairro', type: 'varchar', length: '120' },
          { name: 'cidade', type: 'varchar', length: '120' },
          { name: 'quantidade', type: 'int' },
          {
            name: 'operacao_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'posto_area',
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedTableName: 'operacao',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posto_area');
    await queryRunner.dropTable('operacao');
  }
}
