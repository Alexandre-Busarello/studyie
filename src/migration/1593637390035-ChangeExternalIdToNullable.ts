import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeExternalIdToNullable1593637390035 implements MigrationInterface {
    name = 'ChangeExternalIdToNullable1593637390035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "externalId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "externalId" SET NOT NULL`);
    }

}
