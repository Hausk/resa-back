import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'desk_feature'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('desk_id').references('id').inTable('desks').onDelete('CASCADE')
      table.integer('feature_id').references('id').inTable('features').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
