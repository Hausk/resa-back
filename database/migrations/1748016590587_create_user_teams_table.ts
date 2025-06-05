import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('team_uuid').notNullable()
      table.string('role_in_team', 50).defaultTo('member') // member, admin, etc.
      table.timestamp('joined_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      // Clé primaire composite
      table.primary(['user_id', 'team_uuid'])

      // Clés étrangères
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('team_uuid').references('uuid').inTable('teams').onDelete('CASCADE')

      // Index pour les requêtes
      table.index(['user_id'])
      table.index(['team_uuid'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
