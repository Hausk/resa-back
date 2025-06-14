import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('team_uuid').notNullable()
      table.uuid('user_id').notNullable()
      table.string('role_in_team', 50).defaultTo('member') // member, admin, etc.
      table.timestamp('joined_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      // Clé primaire composite
      table.primary(['team_uuid', 'user_id'])

      // Clés étrangères
      table.foreign('team_uuid').references('uuid').inTable('teams').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      // Index pour les requêtes
      table.index(['team_uuid'])
      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
