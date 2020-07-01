import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePictureUrlToNullable1593637262694 implements MigrationInterface {
    name = 'ChangePictureUrlToNullable1593637262694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET NOT NULL`);
    }

}
