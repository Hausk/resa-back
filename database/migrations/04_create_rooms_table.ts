import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('label').notNullable()
      table.integer('x').notNullable()
      table.integer('y').notNullable()
      table.integer('width').notNullable().defaultTo(100)
      table.integer('height').notNullable().defaultTo(100)
      table.string('type').notNullable().defaultTo('workspace')
      table.integer('capacity')
      table.string('description')
      table.string('color')
      table.string('position').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
