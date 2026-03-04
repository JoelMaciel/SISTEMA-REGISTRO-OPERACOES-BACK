import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddPostoAreaToOcorrencias1769003306018
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ocorrencias',
      new TableColumn({
        name: 'posto_area_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ocorrencias',
      new TableForeignKey({
        name: 'FK_Ocorrencia_PostoArea',
        columnNames: ['posto_area_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'postos_areas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ocorrencias', 'FK_Ocorrencia_PostoArea');
    await queryRunner.dropColumn('ocorrencias', 'posto_area_id');
  }
}
