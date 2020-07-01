import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndLoginTables1593622738304 implements MigrationInterface {
  name = 'AddUserAndLoginTables1593622738304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" text NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(30) NOT NULL, "email" character varying NOT NULL, "pictureUrl" character varying NOT NULL, "isSocialLogin" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "login" ("id" text NOT NULL, "email" character varying(30) NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" text, CONSTRAINT "UQ_a1fa377d7cba456bebaa6922edf" UNIQUE ("email"), CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "login" ADD CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_b1c3fff7c4bc7d15b3018abab6f"`);
    await queryRunner.query(`DROP TABLE "login"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
