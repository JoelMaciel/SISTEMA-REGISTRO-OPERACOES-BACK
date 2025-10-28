import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDataNascimentoToDateInVitimasAndAcusados1761228491022
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "vitimas"
          DROP COLUMN IF EXISTS "data_nascimento"
        `);

    await queryRunner.query(`
          ALTER TABLE "vitimas"
          ADD COLUMN "data_nascimento" DATE
        `);

    await queryRunner.query(`
          ALTER TABLE "acusados"
          DROP COLUMN IF EXISTS "data_nascimento"
        `);

    await queryRunner.query(`
          ALTER TABLE "acusados"
          ADD COLUMN "data_nascimento" DATE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "vitimas"
          DROP COLUMN IF EXISTS "data_nascimento"
        `);

    await queryRunner.query(`
          ALTER TABLE "vitimas"
          ADD COLUMN "data_nascimento" VARCHAR(20)
        `);

    await queryRunner.query(`
          ALTER TABLE "acusados"
          DROP COLUMN IF EXISTS "data_nascimento"
        `);

    await queryRunner.query(`
          ALTER TABLE "acusados"
          ADD COLUMN "data_nascimento" VARCHAR(10)
        `);
  }
}
