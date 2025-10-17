import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOperacaoIdToOcorrencias1760703913560
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ocorrencias',
      new TableColumn({
        name: 'operacao_id',
        type: 'uuid',
        isNullable: true,
        default: 'uuid_generate_v4()',
      }),
    );

    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        columnNames: ['operacao_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operacoes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_ocorrencias_operacao',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ocorrencias', 'FK_ocorrencias_operacao');

    await queryRunner.dropColumn('ocorrencias', 'operacao_id');
  }
}
