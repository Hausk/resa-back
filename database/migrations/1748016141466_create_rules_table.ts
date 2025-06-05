import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.string('code', 50).notNullable().unique() // Code unique pour identifier la règle
      table.text('description').nullable()

      // Type de règle
      table
        .enum('type', [
          'booking_advance', // Réservation à l'avance (ex: 2 jours)
          'max_duration', // Durée maximale (ex: 4 heures)
          'max_per_day', // Maximum par jour (ex: 1 réservation)
          'time_restriction', // Restriction horaire (ex: 8h-18h)
          'custom', // Règle personnalisée
        ])
        .notNullable()

      table.integer('value').notNullable() // Valeur numérique
      table.enum('unit', ['days', 'hours', 'minutes', 'count']).nullable() // Unité
      table.json('conditions').nullable() // Conditions supplémentaires en JSON

      table.boolean('is_active').defaultTo(true)
      table.integer('priority').defaultTo(0) // Priorité d'application

      // Relation avec l'équipe (nullable pour règles globales)
      table.uuid('team_uuid').nullable()
      table.foreign('team_uuid').references('uuid').inTable('teams').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

      // Index
      table.index(['type'])
      table.index(['team_uuid'])
      table.index(['is_active'])
      table.index(['priority'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
