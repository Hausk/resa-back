import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.uuid('desk_id').references('desks.id').onDelete('CASCADE').notNullable()
      table.date('date').notNullable()
      table.enum('period', ['morning', 'afternoon', 'full']).notNullable()
      table.enum('status', ['pending', 'booked', 'canceled']).notNullable().defaultTo('booked')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      table.unique(['desk_id', 'date', 'period'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
