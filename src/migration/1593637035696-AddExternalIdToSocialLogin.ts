import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExternalIdToSocialLogin1593637035696 implements MigrationInterface {
    name = 'AddExternalIdToSocialLogin1593637035696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "externalId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bc97b425592aa51df5da7a440a6" UNIQUE ("externalId")`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "login" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "login" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "login" ADD "userId" text`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "login" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bc97b425592aa51df5da7a440a6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "externalId"`);
    }

}
