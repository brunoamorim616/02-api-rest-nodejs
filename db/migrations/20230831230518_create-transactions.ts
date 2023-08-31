import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary().index().notNullable()
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('transactions')
}