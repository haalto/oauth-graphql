import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE SCHEMA oauth;
    CREATE TABLE oauth.users (
      id  text,
      name varchar(255),
      email varchar(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id)
    )  
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  DROP TABLE oauth.users;
  DROP SCHEMA oauth;
  `);
}
