import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_rules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('team_id').references('teams.id').onDelete('CASCADE').notNullable()
      table.integer('max_days_in_advance').notNullable().defaultTo(7)
      table.boolean('can_reserve_weekends').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
