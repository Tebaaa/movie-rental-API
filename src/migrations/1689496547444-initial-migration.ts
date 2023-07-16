import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1689496547444 implements MigrationInterface {
  name = 'InitialMigration1689496547444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "record" ("record_id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "movie_id" integer NOT NULL, "rent" boolean, "buy" boolean, "return" boolean, CONSTRAINT "PK_192cc759287d532dab9b2896f0c" PRIMARY KEY ("record_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "lastname" character varying(30), "email" character varying(50) NOT NULL, "password" character varying(30) NOT NULL, "admin" boolean NOT NULL, "client" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "poster" character varying NOT NULL, "stock" integer NOT NULL, "trailer_url" character varying NOT NULL, "sale_price" integer NOT NULL, "rent_price" integer NOT NULL, "likes" integer NOT NULL, "available" boolean NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag_movies_movie" ("tag_id" integer NOT NULL, "movie_id" integer NOT NULL, CONSTRAINT "PK_a5292f8c52f244ea420c34cfa10" PRIMARY KEY ("tag_id", "movie_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04f1de63d2f065fd44d1a258bd" ON "tag_movies_movie" ("tag_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7dca074e4371db3dee0bd68735" ON "tag_movies_movie" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_tags_tag" ("movie_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_bfa965ba5983753d13f538eb02b" PRIMARY KEY ("movie_id", "tag_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_62b97c8251a91e7943e00fa596" ON "movie_tags_tag" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84841214027ea2bda39392e847" ON "movie_tags_tag" ("tag_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" ADD CONSTRAINT "FK_7dca074e4371db3dee0bd68735b" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_62b97c8251a91e7943e00fa5964" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" ADD CONSTRAINT "FK_84841214027ea2bda39392e847d" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_84841214027ea2bda39392e847d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_tags_tag" DROP CONSTRAINT "FK_62b97c8251a91e7943e00fa5964"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_7dca074e4371db3dee0bd68735b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_movies_movie" DROP CONSTRAINT "FK_04f1de63d2f065fd44d1a258bd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_e7aa825cfdbab064be4fbedb085"`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84841214027ea2bda39392e847"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_62b97c8251a91e7943e00fa596"`,
    );
    await queryRunner.query(`DROP TABLE "movie_tags_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7dca074e4371db3dee0bd68735"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04f1de63d2f065fd44d1a258bd"`,
    );
    await queryRunner.query(`DROP TABLE "tag_movies_movie"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "record"`);
    await queryRunner.query(`DROP TABLE "tag"`);
  }
}
